"use client";

import React, {useEffect, useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import Word from "../../../../components/Jumble/Word";
import Option from "../../../../components/Jumble/Option";
import services from "../../../../utils/JumbleUtils";
import {UserJumble} from "../../../../../common/src/types";

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
  options: ["I", "speak", "English", "sir", "and", "eat", "dog", "food", "yeah"],
  id: "12345",
  createdAt: new Date(),
  updatedAt: new Date(),
}

interface Item {
  id: string;
  content: string;
}

interface Rows {
  [key: string]: {
    items: Item[];
  };
}

const JumblePractice: React.FC = () => {
  const items: Item[] = [
    {id: "12345", content: "speak"},
    {id: "12346", content: "Spanish"},
    {id: "12347", content: "I"},
    {id: "12348", content: "MOo"},
    {id: "123445", content: "speak"},
    {id: "123d46", content: "Spanish"},
    {id: "12f347", content: "I"},
    {id: "12xx348", content: "MOo"},
    {id: "123f45", content: "speak"},
    {id: "123dd46", content: "Spanish"},
    {id: "1234dd7", content: "I"},
    {id: "12z348", content: "MOo"},
  ];

  const rowsBackend: Rows = {
    Question: {
      items: items,
    },
    Answer: {
      items: [],
    },
  };

  const [userAnswer, setUserAnswer] = useState<string[]>([]);

  const [rows, setRows] = useState<Rows | undefined>(rowsBackend);
  const [isWindowReady, setIsWindowReady] = useState(false);

  useEffect(() => {
    setIsWindowReady(true);
  }, []);

  return (
    <div className="mx-auto p-5">
      <div className="flex mx-auto w-full mt-8 text-center justify-center space-y-6 items-center">
        {/* @ts-ignore */}
        <DragDropContext onDragEnd={(result) => rows && services.onDragEnd(result, rows, setRows)}>
          <div className="bg-gray-100 md:w-3/5 w-full h-4/5 rounded-xl p-10 shadow-xl">
            <div className="mt-16 flex gap-3 text-lg">
              {testJumble.terms.map((term) => (
                <Word text={term.source} hint={term.target}/>
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

                      {rows["Answer"].items.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Option displayText="hi" provided={provided}/>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
              <hr className="border-gray-300"/>
              <br/>
              <hr className="mt-5 border-gray-300"/>
            </div>
            {isWindowReady && (
              <Droppable droppableId="Question" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    className="mt-16 flex items-start gap-2 h-28"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {rows["Question"].items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Option displayText={"LOL"} provided={provided}/>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )}
            <div className="flex justify-center mt-10 md:mt-5">
              {/* @ts-ignore */}
              <button onClick={() => services.handleSubmit(rows, setRows, items)}
                      className="bg-[#2A9D8F] hover:bg-[#264653] transition-all text-white font-medium text-lg px-10 py-2  rounded-lg shadow-lg "
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