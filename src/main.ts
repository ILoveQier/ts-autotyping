/*
 * @Description:
 * @Author: wangchao
 * @Date: 2022-11-08 16:22:13
 */
import "./style.css";
import Typewriter from "./Typewriter";

const typewriter = new Typewriter(
  document.querySelector(".whitespace") as HTMLElement,
  { loop: true, typingSpeed: 30 }
);

typewriter
  .typeString("Where do I start?")
  .pauseFor(333)
  .typeString("\n\nfunctio")
  .deleteChars(7)
  .typeString("const temp")
  .pauseFor(1250)
  .deleteAll(20)
  .typeString("Why is this so hard?")
  .pauseFor(1000)
  .typeString("\n\nDoes everyone struggle this much?")
  .pauseFor(1000)
  .typeString("\n\nThere has to be an easier way")
  .pauseFor(1000)
  .deleteAll(10)
  .start();
