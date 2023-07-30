"use client";

import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/create.module.css";
import CreateSidebar from "./components/CreateSidebar";
import CreateActions from "./components/CreateActions";
import ImagePreviewer from "./components/ImagePreviewer";
import useToggle from "../hooks/useToggle";
import { Survey, SurveyItem } from "../lib/survey.d";
import { createSurvey, uploadSurveyItemImage } from "../service/surveys";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Message from "../components/Message";
import { MessageData } from "../hooks/MessageContext";
import { HttpStatusCodes } from "../lib/httpStatusCodes";

const Create = () => {
  // Check for any previous work that may have been removed from refresh

  const [question, setQuestion] = useState<string>("");
  const [items, setItems] = useState<SurveyItem[]>([]);

  const [itemName, setItemName] = useState<string>("");
  const [itemImage, setItemImage] = useState<any>(null);
  const [itemDetails, setItemDetails] = useState<string>("");

  const [mode, setMode] = useState<string>("New Item");
  const [editIndex, setEditIndex] = useState<number>(0);

  const [protectedAct, setProtectAct] = useState<string | undefined>(undefined);

  const [isOpen, toggler] = useToggle();

  const { message, setMessage } = useContext(MessageData);

  const openStyle = {
    opacity: "25%",
    transform: "scale(0.95)",
    pointerEvents: "none",
  };

  useEffect(() => {
    if (message.continue) {
      switch (protectedAct) {
        case "nuke":
          nukeSurvey();
          break;
        case "submit":
          submitSurvey();
          break;
      }
    }
  }, [message]);

  const errorAction = (msg: string) => {
    setMessage({
      status: "error",
      message: msg,
      continue: false,
    });
  };
  const protectedAction = (action: string, msg: string) => {
    setProtectAct(action);
    setMessage({
      status: "warning",
      message: msg,
      continue: false,
    });
  };

  const handleNewItemClick = () => {
    /* If we are in "New Item" mode, then the user is trying to make a new item. When the
     * button is clicked, a new surveyItem is made and pushed into the list. If user is in
     * edit mode, then the item is updated.
     */
    if (itemName === "") {
      errorAction("Items must have a name to be saved.");
      return;
    }

    var newItem = {
      name: itemName,
      image: itemImage,
      details: itemDetails,
    };

    if (mode === "New Item") {
      setItems((items) => [...items, newItem]);
    } else {
      setItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[editIndex] = newItem;
        return updatedItems;
      });
      setMode("New Item");
    }
    handleResetClick();
  };

  const handleSideBarClick = (e: any) => {
    /* Used in CreateSidebar. Checks if the name or the trash icon was clicked.
     * If the name was clicked, then we are in edit mode, else we delete the item
     * from our list.
     */
    const index: number = Number(e.target.parentNode.id);
    if (e.target.className === "name") {
      setMode("Save Edit");
      setEditIndex(index);
      setItemName(items[index].name);
      setItemDetails(items[index].details);
      setItemImage(items[index].image);
    } else {
      setItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems.splice(index, 1);
        return updatedItems;
      });
    }
  };

  const nukeSurvey = () => {
    /* Empties the list of items, deletes anything saved (in localStorage)
     * and resets the question to blank
     */
    setItems([]);
    setQuestion("");
    handleResetClick();
  };

  const submitSurvey = async () => {
    /* If there are no items in the list, then don't allow submissions.
     * Creates a payload to be sent through fetch. If successful, the current
     * workspace is nuked.
     */
    if (items.length === 0) {
      errorAction("Emtpy surveys cannot be published.");
      return;
    }

    const updatedItems: SurveyItem[] = [];

    await Promise.all(
      items.map(async (item) => {
        if (item.image) {
          const base64Data = item.image.split(",")[1];
          const binaryData = Buffer.from(base64Data, "base64");
          item.image = await uploadSurveyItemImage(binaryData);
        }
        updatedItems.push(item);
      })
    );

    const survey: Survey = {
      question: question,
      items: updatedItems,
    };
    const reqStatus = await createSurvey(survey);
    if (reqStatus == HttpStatusCodes.OK) {
      setMessage({
        status: "success",
        message: "Survey published successfully.",
        continue: false,
      });
      nukeSurvey();
    } else {
      errorAction("Problem occured while trying to publish survey.");
    }
  };

  const handleResetClick = () => {
    setItemName("");
    setItemImage(null);
    setItemDetails("");
  };

  const handleChange = (e: any) => {
    if (e.target.id === "survey-question") {
      setQuestion(e.target.value);
    } else if (e.target.id === "item-name") {
      setItemName(e.target.value);
    } else if (e.target.id === "item-details") {
      setItemDetails(e.target.value);
    }
  };

  const handleImageChange = async (e: any) => {
    const imageFile = e.target.files[0];
    try {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setItemImage(reader.result);
      });
      reader.readAsDataURL(imageFile);
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <React.Fragment>
      <Message />
      <div className={styles.page}>
        <div className="pageBackground" />
        <CreateSidebar
          items={items}
          open={isOpen ? true : false}
          clickAction={handleSideBarClick}
        />
        <button
          className={styles.button}
          onClick={toggler}
          style={isOpen ? { transform: "rotate(180deg)", left: "40vw" } : {}}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <div className={styles.content} style={isOpen ? openStyle : {}}>
          <div className={styles.surveyMaker}>
            <div className={styles.question}>
              <input
                id="survey-question"
                type="text"
                placeholder="Survey Question..."
                value={question}
                onChange={handleChange}
              />
            </div>
            <div className={styles.item}>
              <div className={styles.name}>
                <input
                  id="item-name"
                  type="text"
                  placeholder="Item Name..."
                  value={itemName}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.image}>
                {itemImage && <ImagePreviewer imageFile={itemImage} />}
                <label htmlFor="item-image" className={styles.imageButton}>
                  <p>{`${itemImage ? "Replace" : "Add"} Image`}</p>
                </label>
                <input id="item-image" type="file" hidden onChange={handleImageChange} />
              </div>
              <div className={styles.text}>
                <textarea
                  id="item-details"
                  placeholder="Add details for the item..."
                  value={itemDetails}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.newItem} onClick={handleNewItemClick}>
              <h3>{mode}</h3>
            </div>
          </div>
        </div>
        <CreateActions
          submitAction={() =>
            protectedAction("submit", "Surveys cannot be editted once published.")
          }
          resetAction={handleResetClick}
          deleteAction={() => protectedAction("nuke", "All progress made will be deleted.")}
        />
      </div>
    </React.Fragment>
  );
};

export default Create;
