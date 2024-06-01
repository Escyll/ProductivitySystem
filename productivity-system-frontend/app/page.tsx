"use client";

import { DayTasks } from "@/app/lib/definitions";
import { LightSwitch } from "@/app/LightSwitch";
import { TaskRow } from "@/app/TaskRow";

import { Indie_Flower } from "next/font/google";

const font = Indie_Flower({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const dayTasks: DayTasks = {
    dow: "Tuesday",
    date: "14-05-2024",
    tasks: [
      {
        name: "Vecos meeting minutes",
        points: 5,
        done: false,
      },
      { name: "OR vertalen", points: 6, done: true },
      { name: "Beijer Dashboard", points: 4, done: true },
    ],
  };
  let possiblePoints = dayTasks.tasks.reduce(
    (acc, task) => acc + task.points,
    0
  );
  let actualPoints = dayTasks.tasks.reduce(
    (acc, task) => acc + (task.done ? task.points : 0),
    0
  );
  return (
    <div className="bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white text-5xl">
      <LightSwitch />
      <div
        className={`${font.className} flex min-h-screen flex-col justify-between p-24`}
      >
        <div className="flex flex-col w-full bg-slate-50 dark:bg-slate-700 rounded-lg px-6 py-8 shadow-2xl">
          <div className="flex justify-center">
            <div className="flex flex-col items-center font-bold">
              <div className="pb-2">{dayTasks.dow}</div>
              <div>{dayTasks.date}</div>
            </div>
          </div>
          <div className="flex w-200">
            <div className="grow" />
            <div className="flex justify-center w-14">P</div>
            <div className="flex justify-center w-14">A</div>
          </div>
          <hr className="h-1 bg-red-600 border-0 dark:bg-gray-600" />
          <div className="divide-y w-200 border-r z-10">
            {dayTasks.tasks.map((task, i) => (
              <TaskRow {...task} key={i} />
            ))}
          </div>
          <div className="flex w-200 divide-x border-r z-0">
            <hr className="grow h-1 bg-red-600 border-0 dark:bg-gray-600" />
            <hr className="w-14 h-1 bg-red-600 border-0 dark:bg-gray-600" />
            <hr className="w-14 h-1 bg-red-600 border-0 dark:bg-gray-600" />
          </div>
          <div className="flex w-200 divide-x border-r">
            <div className="grow" />
            <div className="flex justify-center w-14 text-gray-500 text-6xl">
              {possiblePoints}
            </div>
            <div className="flex justify-center w-14 text-6xl">
              {actualPoints}
            </div>
          </div>
          <div className="flex pt-8 justify-center font-bold">
            {possiblePoints > 0
              ? Math.round((100 * actualPoints) / possiblePoints)
              : 0}
            %
          </div>
        </div>
      </div>
    </div>
  );
}
