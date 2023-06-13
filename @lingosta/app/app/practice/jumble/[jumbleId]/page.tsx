"use client";

import React, {useEffect, useState} from "react";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import Word from "../../../../components/Jumble/Word";
import Option from "../../../../components/Jumble/Option";
import {UserJumble} from "../../../../models";
import {v4 as uuidv4} from 'uuid';
import { Toaster, toast } from "react-hot-toast";

// Placeholder
const testJumble: UserJumble = {
  ownerId: "12345",
  sourceGroupIds: ["12345", "12346"],
  processId: "12345",
  terms: [
    {
      "source": "Yo",
      "target": "I",
      "weight": 0,
    },
    {
      "source": "hablo",
      "target": "speak",
      "weight": 0,
    },
    {
      "source": "ingles",
      "target": "English",
      "weight": 0,
    },
    {
      "source": "señor",
      "target": "sir",
      "weight": 0,
    },
  ],
  options: ["I", "speak", "English", "sir", "and", "eat", "food", "coffee"],
  id: "12345",
  createdAt: new Date(),
  updatedAt: new Date(),
  isReversed: false,
}

interface JumbleItem {
  id: string;
  displayText: string;
}

const onDragEnd = (
  dropResult: DropResult,
  jumbleOptions: JumbleItem[],
  userAnswer: JumbleItem[],
  setUserAnswer: React.Dispatch<React.SetStateAction<JumbleItem[]>>,
  setJumbleOptions: React.Dispatch<React.SetStateAction<JumbleItem[]>>,
) => {
  if (!dropResult.destination) return;

  const { source, destination } = dropResult;

  if (source.droppableId !== destination.droppableId) {
    // Handle moving an option between question/answer
    const sourceList = source.droppableId === "Answer" ? userAnswer : jumbleOptions;
    const destinationList = source.droppableId === "Answer" ? jumbleOptions : userAnswer;

    // Remove the item from the source
    const movedItem = sourceList[source.index];
    const modifiedSource = sourceList.filter((j: JumbleItem, index: number) => index !== source.index);

    // Add the item into the destination
    const modifiedDestination = [...destinationList];
    modifiedDestination.splice(destination.index, 0, movedItem);

    if (source.droppableId === "Answer") {
      setJumbleOptions(modifiedDestination);
      setUserAnswer(modifiedSource);
    } else {
      setJumbleOptions(modifiedSource);
      setUserAnswer(modifiedDestination);
    }
  } else {
    // Handle moving an option within the question/answer
    const modified = source.droppableId === "Answer" ? [...userAnswer] : [...jumbleOptions];
    const [item] = modified.splice(source.index, 1);
    modified.splice(destination.index, 0, item);

    if (source.droppableId === "Answer") {
      setUserAnswer(modified);
    } else {
      setJumbleOptions(modified);
    }
  }
};

const JumblePractice: React.FC = () => {
  const [isWindowReady, setIsWindowReady] = useState(false);
  const [userAnswer, setUserAnswer] = useState<JumbleItem[]>([]);
  const [jumbleOptions, setJumbleOptions] = useState<JumbleItem[]>([]);
  const [answer, setAnswer] = useState<string[]>([]);

  useEffect(() => {
    setJumbleOptions(
      testJumble.options
        .sort(() => 0.5 - Math.random())
        .map((option) => ({
          id: uuidv4(),
          displayText: option,
        }))
    );
    setAnswer(testJumble.terms.map((term) => term.target));
    setIsWindowReady(true);
  }, []);

  const handleSubmit = () => {
    if (
      userAnswer.map((v) => v.displayText).join(" ") === answer.join(" ")
    ) {
      toast.success('Correct!')
    } else {
      toast.error("Incorrect!")
    }
  };

  return (
    <div className="mx-auto">
      <div className="bg-teal-500 w-full p-1 top-0 mx-auto text-center">
        <span className="text-white text-sm font-bold">
          This is a preview for Jumbles!
        </span>
      </div>
      <Toaster />
      <div className="flex mx-auto max-w-2xl w-full text-center justify-center space-y-6 items-center p-5">
        <DragDropContext
          onDragEnd={(dropResult: DropResult) =>
            testJumble &&
            onDragEnd(dropResult, jumbleOptions, userAnswer, setUserAnswer, setJumbleOptions)
          }
        >
          <div className="bg-slate-200 w-full h-4/5 rounded-xl p-10 shadow-xl">
            <div className="mt-16 flex gap-3 text-lg">
              {testJumble.terms.map((term, index) => (
                <Word key={index} text={term.source} hint={term.target} />
              ))}
            </div>
            <div className="mt-10">
              {isWindowReady && (
                <Droppable droppableId="Answer" direction="horizontal">
                  {(provided, snapshot) => (
                    <div
                      className="flex gap-2 w-full h-10"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {userAnswer.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Option
                              displayText={item.displayText}
                              provided={provided}
                            />
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
              <hr className="border-gray-300" />
              <br />
              <hr className="mt-5 border-gray-300" />
            </div>
            {isWindowReady && (
              <Droppable droppableId="Question" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    className="mt-16 flex flex-wrap items-start gap-2 h-28"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {jumbleOptions.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Option
                            displayText={item.displayText}
                            provided={provided}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )}
            <div className="flex justify-center mt-10 md:mt-5">
              <button
                onClick={() => handleSubmit()}
                className="bg-[#2A9D8F] hover:bg-[#264653] transition-all text-white font-medium text-lg px-10 py-2 rounded-lg shadow-lg"
              >
                Check
              </button>
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default JumblePractice;