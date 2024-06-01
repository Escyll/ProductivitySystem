"use client";
import { Task } from "./lib/definitions";

export function TaskRow({ name, points, done }: Task) {
  return (
    <div className="flex divide-x items-bottom">
      <span className="grow h-10 font-medium">{name}</span>
      <span className="flex justify-center w-14 text-gray-500 font-extralight">
        {points}
      </span>
      <span className="flex justify-center w-14 font-bold">
        {done ? points : ""}
      </span>
    </div>
  );
}
