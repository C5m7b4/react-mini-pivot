export const generateId = () => {
  const u =
    Date.now().toString(16) + Math.random().toString(16) + '0'.repeat(16);
  const guid = [
    u.substr(0, 8),
    u.substr(8, 4),
    '4000-8' + u.substr(13, 3),
    u.substr(16, 12),
  ].join('-');
  return guid;
};
