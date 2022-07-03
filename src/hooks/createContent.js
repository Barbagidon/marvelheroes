import { useState } from "react";

const CreateContent = (
  objectType,
  offsetNumber,
  loadingStep = 10,
  isComicsList = false
) => {
  const [scroll, setScroll] = useState(false);
  const [chars, setChars] = useState(objectType);
  const [num, setNum] = useState(offsetNumber);
  const [charEnded, setcharEnded] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [issueNumber, setIssueNumber] = useState(1);
  const [loadingProcess, setLoadingProcess] = useState(false);
  const [anim, setAnim] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const onCharLoaded = (chars) => {
    setChars(chars);

    setNum((num) => num + loadingStep);
    setIssueNumber((issueNumber) => issueNumber + 1);
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
    setLoadingProcess(true);
    requestFoo(url + num, issueNumber) ///     getContentToScroll(getComics, `limit=8&offset=`);
      .then((charsList) => {
        if (!charsList || charsList.length < 2) {
          setcharEnded(true);
        } else {
          const moreChars = chars.concat(charsList);
          setLoadingProcess(false);
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
    setLoadingProcess(true);
    requestFoo(url + num, issueNumber).then((charsList) => {
      setFirstLoading(false);
      setLoadingProcess(false);

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

  const updateChar = (getCharacter, name) => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    setAnim(true);
    if (!name) {
      getCharacter(id).then((res) => {
        onCharLoaded(res);
      });
    } else {
      getCharacter(false, name).then((res) => {
        setChars("");
        const result = [];
        if (res) {
          result.push(res);
          onCharLoaded(result);
        }
        setShowMessage(true);
      });
    }
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
    updateChar,
    loadingProcess,
    setAnim,
    anim,
    showMessage,
    setShowMessage,
  };
};

export default CreateContent;
