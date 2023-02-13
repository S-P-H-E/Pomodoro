import Image from "next/image";
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { BsSunFill } from 'react-icons/bs';
import { BsFillMoonFill } from 'react-icons/bs';
import Head from "next/head";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [timer, setTimer] = useState(false);
  const seconds = 5
  const [time, setTime] = useState(seconds); // Initial time in seconds

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let currentTheme = theme === 'system' ? null : theme;
    if (typeof currentTheme === 'string') {
      localStorage.setItem('theme', currentTheme);
    } else {
      localStorage.setItem('theme', '');
    }
  }, [theme]);
  

  useEffect(() => {
    let intervalId: any = null;
    if (timer && time > 0) {
      intervalId = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (!timer || time === 0) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [timer, time]);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? null : theme;

  return (
    <>
      <Head>
        <title>Pomodoro</title>
        <meta name="description" content="Stay productive and keep track of your tasks." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center items-center h-screen">
      <div>
        <div className="flex justify-center">
          {currentTheme === 'dark' ? (
            // Dark Mode
            <div className="w-screen h-screen bg-[#181818] flex justify-center items-center">
              <div className="bg-[#262626] w-[450px] h-[250px] rounded-lg border-[1px] border-[#2f2f2f] p-5">
                <div className="flex justify-between items-center">
                  <h1 className="font-medium text-xl">Pomodoro 🍅</h1>
                  <div>
                    <BsSunFill className="text-[#bfbfbf] cursor-pointer" onClick={() => setTheme('light')} />
                  </div>
                </div>
                <div className="h-[1px] bg-[#2f2f2f] my-4" />
                <div className="w-full h-[145px] flex flex-col justify-center items-center">
                  <h1 className="text-6xl font-medium m-2">{time === 0 ? 'Time is up!' : `${Math.floor(time / 60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`}</h1>
                  <div className="">
                  <button className="border-[1px] border-[#9F9F9F] px-3 py-1 rounded-lg m-2 text-[#9F9F9F]" onClick={() => {
                    if (time === 0) {
                      setTime(seconds);
                    }
                    setTimer(!timer);
                  }}>
                    {time === 0 ? 'Reset' : timer ? 'Stop' : 'Start'}
                  </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Light Mode
            <div className="w-screen h-screen text-[#1e1e1e] bg-[#f4f4f4] flex justify-center items-center">
              <div className="bg-[#ffffff] w-[450px] h-[250px] rounded-lg p-5">
                <div className="flex justify-between items-center">
                  <h1 className="font-medium text-xl">Pomodoro 🍅</h1>
                  <div>
                    <BsFillMoonFill className="text-[#bfbfbf] cursor-pointer" onClick={() => setTheme('dark')} />
                  </div>
                </div>
                <div className="h-[1px] bg-[#bfbfbf] my-4" />
                <div className="w-full h-[145px] flex flex-col justify-center items-center">
                <h1 className="text-6xl font-medium m-2">{time === 0 ? 'Time is up!' : `${Math.floor(time / 60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`}</h1>
                  <div className="">
                  <button className="border-[1px] border-[#9F9F9F] px-3 py-1 rounded-lg m-2 text-[#9F9F9F]" onClick={() => {
                    if (time === 0) {
                      setTime(seconds);
                    }
                    setTimer(!timer);
                  }}>
                    {time === 0 ? 'Reset' : timer ? 'Stop' : 'Start'}
                  </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}


