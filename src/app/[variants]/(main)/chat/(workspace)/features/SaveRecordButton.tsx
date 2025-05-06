'use client';

import { ActionIcon, Tooltip } from '@lobehub/ui';
import { FolderDown } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { DESKTOP_HEADER_ICON_SIZE, MOBILE_HEADER_ICON_SIZE } from '@/const/layoutTokens';
import { chatSelectors } from '@/store/chat/selectors';
import { getChatStoreState } from '@/store/chat/store';
import { getSessionStoreState, useSessionStore } from '@/store/session';
import { sessionSelectors } from '@/store/session/selectors';
import { sessionGroupSelectors } from '@/store/session/slices/sessionGroup/selectors';

const SaveRecordButton = memo<{ mobile?: boolean }>(({ mobile }) => {
  const store = useSessionStore();
  const { t } = useTranslation('common');

  return (
    <Tooltip title={t('saveRecord.title', { ns: 'hotkey' })}>
      <ActionIcon
        icon={FolderDown}
        onClick={() => {
          // 当前聊天所在的group名
          const state = getSessionStoreState();
          const session_state = sessionSelectors.currentSession(state);
          let group = 'default';
          if (session_state && session_state.group) {
            group =
              sessionGroupSelectors.getGroupById(session_state.group)(store)?.name || 'default';
          }

          // 消息记录
          const chatStoreState = getChatStoreState();
          const records = chatSelectors.activeBaseChatsWithoutTool(chatStoreState);

          // Filter the records to only include necessary fields
          let filteredRecords = records.map((record, index) => {
            // Extract only the required fields
            const { role, content, createdAt, updatedAt } = record;

            let resp_time = 0;

            // If not the first message, calculate response time
            if (index > 0) {
              const currentCreatedAt = new Date(record.createdAt).getTime();
              const prevUpdatedAt = new Date(records[index - 1].updatedAt).getTime();
              resp_time = (currentCreatedAt - prevUpdatedAt) / 1000; // Convert to seconds
            }
            // Format createdAt and updatedAt from timestamp to readable date string
            const formattedCreatedAt = new Date(createdAt)
              .toISOString()
              .replace('T', ' ')
              .slice(0, 19);
            const formattedUpdatedAt = new Date(updatedAt)
              .toISOString()
              .replace('T', ' ')
              .slice(0, 19);

            // Replace the timestamp values with formatted date strings
            return {
              content,

              createdAt: formattedCreatedAt,

              resp_time,
              // eslint-disable-next-line sort-keys-fix/sort-keys-fix
              role,
              updatedAt: formattedUpdatedAt,
            };
          });

          // Convert JSON data to CSV format
          const headers = Object.keys(filteredRecords[0] || {}).join(',');
          const csvRows = filteredRecords.map((record) =>
            Object.values(record)
              .map((value) =>
                typeof value === 'string'
                  ? `"${value.replaceAll('"', '""').replaceAll('\n', ' ')}"`
                  : value,
              )
              .join(','),
          );
          const csvData = [headers, ...csvRows].join('\n');

          // 下载
          // Create a blob from the CSV data
          const blob = new Blob([csvData], { type: 'text/csv' });
          // Create a URL for the blob
          const url = URL.createObjectURL(blob);
          // Create a temporary anchor element
          const a = document.createElement('a');
          a.href = url;
          // Set the file name with current date and time
          const date = new Date();
          const fileName = `${group}_${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}_${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}.csv`;
          a.download = fileName;
          // Append to body, click to download, and clean up
          document.body.append(a);
          a.click();
          // Clean up
          a.remove();
          URL.revokeObjectURL(url);
        }}
        size={mobile ? MOBILE_HEADER_ICON_SIZE : DESKTOP_HEADER_ICON_SIZE}
      />
    </Tooltip>
  );
});

export default SaveRecordButton;
