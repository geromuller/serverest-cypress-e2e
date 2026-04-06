const pad = (value) => String(value).padStart(2, '0');
let suffixCounter = 0;

export const buildReadableSuffix = () => {
  const now = new Date();
  suffixCounter += 1;
  const date = [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
  ].join('');
  const time = [
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
    String(now.getMilliseconds()).padStart(3, '0'),
  ].join('');
  const counter = String(suffixCounter).padStart(3, '0');

  return `${date}${time}${counter}`;
};

export const buildUniqueEmail = (prefix = 'user') =>
  `${prefix}.${buildReadableSuffix()}@example.com`;

export const buildUniqueName = (prefix = 'User') =>
  `${prefix} ${buildReadableSuffix()}`;

export const buildUniqueProductName = (prefix = 'Product') =>
  `${prefix} ${buildReadableSuffix()}`;
