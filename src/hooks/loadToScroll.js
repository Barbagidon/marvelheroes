import { useState, useEffect } from "react";

const CreateContent = (offsetNumber) => {
  const [scroll, setScroll] = useState(false);
  const [chars, setChars] = useState([]);
  const [num, setNum] = useState(offsetNumber);
  const [charEnded, setcharEnded] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);

  const onCharLoaded = (chars) => {
    setChars(chars);
    setNum((num) => num + 10);
  };

  const getBottomWindow = () => {
    if (
      document.documentElement.scrollTop +
        document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 100
    ) {
      setScroll(true);
      //
    }
  };

  const getContentToScroll = (requestFoo, url) => {
    requestFoo(url + num)
      .then((charsList) => {
        if (!charsList || charsList.length < 2) {
          setcharEnded(true);
        } else {
          const moreChars = chars.concat(charsList);
          onCharLoaded(moreChars);
        }
      })
      .finally(() => {
        setScroll(false);
      });
  };

  const getChars = (requestFoo, url, i) => {
    if (i) {
      setNum((num) => num + i);
    }
    
    requestFoo(url + num).then((charsList) => {
        setFirstLoading(false);
      if (!chars || chars.length < -1) {
        setcharEnded(true);
      } else {
        if (i) {
          const moreChars = chars.concat(charsList);
          onCharLoaded(() => moreChars);
        } else {
          onCharLoaded(() => charsList);
        }
      }
    });
  };

  return {
    scroll,
    chars,
    num,
    charEnded,
    firstLoading,
    getBottomWindow,
    getChars,
    getContentToScroll,
    setFirstLoading,
  };
};

export default CreateContent;
