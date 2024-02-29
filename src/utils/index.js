

export const calculateTimeDifference = (javaDateTime) => {
  const createdAtDate = new Date(javaDateTime);
  const now = new Date();
  const timeDiff = now - createdAtDate;
  const secondsDiff = Math.floor(timeDiff / 1000);
  const minutesDiff = Math.floor(secondsDiff / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);
  const weeksDiff = Math.floor(daysDiff / 7);
  const monthsDiff = Math.floor(daysDiff / 30);

  if (monthsDiff > 0) {
    return monthsDiff == 1 ? `${monthsDiff} month ago` : `${monthsDiff} months ago`
  } else if (weeksDiff > 0) {
    return weeksDiff == 1 ? `${weeksDiff} week ago` : `${weeksDiff} weeks ago`;
  } else if (daysDiff > 0) {
    return daysDiff == 1 ? `${daysDiff} day ago` : `${daysDiff} days ago`;
  } else if (hoursDiff > 0) {
    return hoursDiff == 1 ? `${hoursDiff} hour ago` : `${hoursDiff} hours ago`;
  } else if (minutesDiff > 0) {
    return monthsDiff == 1 ? `${minutesDiff} minute ago` : `${minutesDiff} minutes ago`;
  } else {
    // return `${secondsDiff} seconds ago`;
    return 'a few seconds ago';
  }
};

export const calculateTimeDiff = (javaDateTime, currentTime) => {
  const createdAtDate = new Date(javaDateTime);
  const now = new Date();
  const timeDiff = now - createdAtDate;
  const secondsDiff = Math.floor(timeDiff / 1000);
  const minutesDiff = Math.floor(secondsDiff / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);
  const weeksDiff = Math.floor(daysDiff / 7);
  const monthsDiff = Math.floor(daysDiff / 30);

  if (weeksDiff > 0) {
    return `${weeksDiff}w`;
  } else if (daysDiff > 0) {
    return `${daysDiff}d`;
  } else if (hoursDiff > 0) {
    return `${hoursDiff}h`;
  } else if (minutesDiff > 0) {
    return `${minutesDiff}m`;
  } else {
    return `1m`;
  }
};

export const formatTime = (createdAt) => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffTime = now - createdDate;

  // Check if the message was sent today
  if (createdDate.toDateString() === now.toDateString()) {
    return `${createdDate.getHours()}:${(createdDate.getMinutes() < 10 ? '0' : '') + createdDate.getMinutes()}`;
  }

  // Check if the message was sent within the last week
  const daysAgo = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (daysAgo < 7) {
    return `${createdDate.toLocaleDateString('en-US', { weekday: 'short' })} ${createdDate.getHours()}:${(createdDate.getMinutes() < 10 ? '0' : '') + createdDate.getMinutes()}`;
  }

  // Otherwise, return the full date and time
  return `${createdDate.toLocaleDateString('en-US', { weekday: 'short' })}, ${createdDate.toLocaleDateString()} ${createdDate.getHours()}:${(createdDate.getMinutes() < 10 ? '0' : '') + createdDate.getMinutes()}`;
};

export async function getResourceImage(urlName) {
  try {
    // const resourceModule = await import(urlName);

    console.log(`../../src/assets/${urlName}`)

    const resourceModule = await import(`../../src/assets/${urlName}`);

    console.log(resourceModule);
    return resourceModule.default;
  } catch (ex) {
    console.log(ex)
    const resourceModule = await import("../../src/assets/loading.gif");
    return resourceModule.default;
  }
}

