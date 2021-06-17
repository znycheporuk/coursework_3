import { message } from 'antd';

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    message.success('Збережено в буфер обміну!');
  } catch (err) {
    message.error('Збереження в буфер обміну не вдалося!');
    console.error(err);
  }
};