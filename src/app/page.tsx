"use client";
import { useEffect, useState } from "react";
import { css } from "../../styled-system/css";

const baseButton = css({
  backgroundColor: "skyblue",
  borderRadius: "50%",
  height: "3rem",
  width: "3rem",
  cursor: "pointer",
});

const selectButton = css({
  backgroundColor: "orange",
  borderRadius: "50%",
  height: "3rem",
  width: "3rem",
  cursor: "pointer",
});

const errorButton = css({
  backgroundColor: "red",
  borderRadius: "50%",
  height: "3rem",
  width: "3rem",
  pointerEvents: "none",
});

const successButton = css({
  backgroundColor: "yellowgreen",
  borderRadius: "50%",
  height: "3rem",
  width: "3rem",
  cursor: "pointer",
});

export default function Home() {
  const [answer, setAnswer] = useState<number[]>([]);
  const [stage, setStage] = useState(4);
  const [input, setInput] = useState<[number, number] | []>([]);
  const [result, setResult] = useState("none");

  useEffect(() => {
    if (result === "success" || answer.length === 0) {
      console.log("계속 들어오니?");
      const stageArray: number[] = [];
      for (let i = 0; i < stage; i++) {
        const onSetIndex = () => {
          let index = Math.floor(Math.random() * stage) + 1;
          if (stageArray.indexOf(index) === -1) {
            return stageArray.push(index);
          } else {
            onSetIndex();
          }
        };
        onSetIndex();
      }
      setAnswer(stageArray);
      if (result === "success") {
        setTimeout(() => {
          setInput([]);
          setResult("none");
        }, 1500);
      }
    }
  }, [result]);

  useEffect(() => {
    if (answer.length !== 0 && answer.length === input.length) {
      for (let j = 1; j < stage + 1; j++) {
        console.log(answer, answer.indexOf(j));
        console.log(input, input.indexOf(j));

        if (answer.indexOf(j) !== input.indexOf(j)) {
          return setResult("error");
        }
      }
      console.log(result);
      if (result === "none") {
        setResult("success");
      }
    }
  }, [input]);

  useEffect(() => {
    if (result === "error") {
      setTimeout(() => {
        setResult("none");
        setInput([]);
      }, 1000);
    }
  }, [result]);
  console.log(answer, input);

  const onSetCount = (count: number) => {
    if (input.indexOf(count) === -1) {
      setInput([...input, []]);
    } else {
      const deleteCount = input.indexOf(count);
      const newInput = [...input];
      newInput.splice(deleteCount, 1);
      setInput([...newInput]);
    }
  };

  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        width: "150px",
        height: "150px",
        margin: "auto ",
      })}
    >
      {answer?.map((idx) => (
        <button
          className={
            result === "error"
              ? errorButton
              : result === "success"
              ? successButton
              : input.indexOf(idx) === -1
              ? baseButton
              : selectButton
          }
          key={(idx + 1).toString()}
          onClick={() => onSetCount(idx)}
        ></button>
      ))}
    </div>
  );
}
