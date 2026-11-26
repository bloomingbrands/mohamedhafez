"use client";
import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { useRef } from "react";
import * as React from "react";
import useGithubStats from "react-github-user-stats";
// Also install this npm i --save-dev @types/react-lottie
import Lottie from "react-lottie";
import { MagicCard } from "@/components/magicui/magic-card";
import { cn } from "@/lib/utils";
import { Confetti, type ConfettiRef } from "@/components/magicui/confetti";
// import { BackgroundGradientAnimation } from "./GradientBg";
import { NumberTicker } from "@/components/magicui/number-ticker";
import GridGlobe from "./GridGlobe";
import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        // change gap-4 to gap-8, change grid-cols-3 to grid-cols-5, remove md:auto-rows-[18rem], add responsive code
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  //   remove unecessary things here
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const leftLists = ["Node", "Express", "Typescript", "JavaScript"];
  const rightLists = ["ReactJS", "NextJS", "AstroJS", "MYSQL"];
  const confettiRef = useRef<ConfettiRef>(null);
  const [copied, setCopied] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopy = () => {
    const text = "mhafez1978@outlook.com";
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // Make sure the file is in the "public" folder
    link.download = "Resume.pdf"; // Custom file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setBtnClicked(true);
  };

  const { error, loading, userData } = useGithubStats("mhafez1978");

  if (loading) return <h1>Loading data..</h1>;
  if (error) return <h1>ERROR: {error}</h1>;
  if (!userData) return <h1>Not found!</h1>;

  return (
    <div
      className={cn(
        // remove p-4 rounded-3xl dark:bg-black dark:border-white/[0.2] bg-white  border border-transparent, add border border-white/[0.1] overflow-hidden relative
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4 hover:border hover:border-[#3d269a]",
        className
      )}
      style={{
        //   add these two
        //   you can generate the color from here https://cssgradient.io/
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      {/* add img divs */}
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center ")}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 && "w-full opacity-80"
          } `}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              //   width={220}
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>
        {id === 4 ? (
          <div
            className={cn(
              titleClassName,
              "group-hover/bento:translate-x-2 transition bg-slate-900/50 duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
            )}
          >
            {/* change the order of the title and des, font-extralight, remove text-xs text-neutral-600 dark:text-neutral-300 , change the text-color */}
            <div className="font-sans font-extralight md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
              {description}
            </div>
            {/* add text-3xl max-w-96 , remove text-neutral-600 dark:text-neutral-300*/}
            {/* remove mb-2 mt-2 */}
            <div
              className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10`}
            >
              {title}
            </div>
            <div className="mt-5 relative">
              <MagicButton
                title={!btnClicked ? "Download" : "Download Complete"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleResumeDownload}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          </div>
        ) : (
          <div
            className={cn(
              titleClassName,
              "group-hover/bento:translate-x-2 transition text-white duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
            )}
          >
            {/* change the order of the title and des, font-extralight, remove text-xs text-neutral-600 dark:text-neutral-300 , change the text-color */}
            <div className="font-sans font-extralight md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
              {description}
            </div>
            {/* add text-3xl max-w-96 , remove text-neutral-600 dark:text-neutral-300*/}
            {/* remove mb-2 mt-2 */}
            <div
              className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10`}
            >
              {title}
            </div>

            {/* for the github 3d globe */}
            {id === 2 && <GridGlobe />}

            {/* Tech stack list div */}
            {id === 3 && (
              <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
                {/* tech stack lists */}
                <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                  {leftLists.map((item, i) => (
                    <span
                      key={i}
                      className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                    >
                      {item}
                    </span>
                  ))}
                  <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]"></span>
                </div>
                <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                  <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]"></span>
                  {rightLists.map((item, i) => (
                    <span
                      key={i}
                      className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {id === 5 && (
              <div className="flex flex-col items-center pl-40 justify-center md:gap-3 lg:gap-8 object-cover w-[120%] h-full absolute -right-3 lg:-right-2">
                <MagicCard className="bg-transparent p-8 w-[300px] rounded-lg">
                  <h2 className="text-2xl mb-2 italic">GitHub Followers</h2>
                  <NumberTicker
                    value={userData.followers}
                    className="text-4xl italic font-black"
                    delay={0}
                  />
                </MagicCard>
                <MagicCard className="bg-transparent p-8 w-[300px] rounded-lg">
                  <h2 className="text-2xl mb-2 italic">GitHub Repos</h2>
                  <NumberTicker
                    value={userData.public_repos}
                    className="text-4xl italic font-black"
                    delay={0}
                  />
                </MagicCard>
                <MagicCard className="bg-transparent p-8 w-[300px] rounded-lg">
                  <h2 className="text-2xl mb-2 italic">GitHub Stars</h2>
                  <NumberTicker
                    value={userData.total_stars}
                    className="text-4xl italic font-black"
                    delay={0}
                  />
                </MagicCard>
              </div>
            )}

            {id === 6 && (
              <>
                <div className="mt-5 relative">
                  <div
                    className={`absolute -bottom-5 right-0 ${
                      copied ? "block" : "block"
                    }`}
                  >
                    {/* <img src="/confetti.gif" alt="confetti" /> */}
                    {/* <Lottie options={defaultOptions} height={200} width={400} /> */}
                  </div>

                  <MagicButton
                    title={
                      copied ? "Email is Copied!" : "Copy my email address"
                    }
                    icon={<IoCopyOutline />}
                    position="left"
                    handleClick={handleCopy}
                    otherClasses="!bg-[#161A31]"
                  />

                  {copied && (
                    <Confetti
                      ref={confettiRef}
                      className="absolute left-0 top-0 z-0 size-full"
                    />
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
