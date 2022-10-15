export const parsingLyric = lyric => {
  const splitLyric = lyric.split('\n');
  const totalReg = /\[\d*:\d*\.\d*\]/g;
  const minuteReg = /\[\d*/;
  const secondReg = /:\d*/;
  const list = [];

  splitLyric.forEach(lyric => {
    const allTime = lyric.match(totalReg);
    if (!allTime) {
      return;
    }
    const songName = lyric.replace(allTime[0], '').trim();
    const minute = allTime[0].match(minuteReg)[0].substr(1);
    const second = allTime[0].match(secondReg)[0].substr(1);
    const time = parseInt(minute) * 60 + parseInt(second);

    list.push({ time, songName });
  })

  return list;
}

export const formatTime = duration => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  return toTwo(minutes) + ':' + toTwo(seconds);
}

export const toTwo = time => {
  return time < 10 ? '0' + time : time;
}

export const getRandomIndex = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const setStorage = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
}

export const getStorage = name => {
  return JSON.parse(localStorage.getItem(name));
}

