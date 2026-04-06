const pad = (value) => String(value).padStart(2, '0');

export const buildReadableSuffix = () => {
  const now = new Date();
  const date = [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
  ].join('');
  const time = [
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join('');
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');

  return `${date}${time}${random}`;
};

export const buildUniqueEmail = (prefix = 'user') =>
  `${prefix}.${buildReadableSuffix()}@qa.local`;

export const buildUniqueName = (prefix = 'User') =>
  `${prefix} ${buildReadableSuffix()}`;

export const buildUniqueProductName = (prefix = 'Product') =>
  `${prefix} ${buildReadableSuffix()}`;
