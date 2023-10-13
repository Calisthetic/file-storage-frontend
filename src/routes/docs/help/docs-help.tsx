import { FunctionComponent, Suspense, lazy, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckForError } from "../../../lib/check-errors";
import { apiUrl } from "../../../data/data";
import AlertButton from "../../../components/alert-button";
import { modalWindowStyle } from "../../../data/style/modal-styles";

const Box = lazy(() => import('@mui/material/Box'));
const Modal = lazy(() => import('@mui/material/Modal'));

interface IQuestions {
  question: string
  answer: string
}
const DocsHelp: FunctionComponent = () => {
  // New question
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const modalQuestionOpen = () => setIsQuestionModalOpen(true);
  const modalQuestionClose = () => setIsQuestionModalOpen(false);
  const newQuestionInputRef:any = useRef()

  const navigate = useNavigate()
  let token = localStorage.getItem("token")
  
  const questions:IQuestions[] = [
    {
      question: "Do you really only have one developer?",
      answer: "Yeah"
    },
    {
      question: "What is the main difference between your service and analogues?",
      answer: "Our team collected the best features of competitors, implemented them in this project and made it free"
    },
    {
      question: "What are your plans for further development of the project?",
      answer: "Expansion of current functionality"
    },
    {
      question: "What is the goal of this project?",
      answer: "Introducing a simple, reliable and customizable service for quick access to various files"
    },
    {
      question: "What are the project costs?",
      answer: "The cost of this project can only be estimated by the time spent"
    },
    {
      question: "How long has this project been in development?",
      answer: "Development began in August 2023"
    },
    {
      question: "Will you be creating any products?",
      answer: "Yeah, sure"
    },
    {
      question: "Do you need partners or employees?",
      answer: "We will welcome all your ideas and suggestions. For developers who want to change something, we are waiting for your pull requests"
    },
    {
      question: "How can I contact you?",
      answer: "Contact address: contact.adress@ex.com"
    },
    {
      question: "Where can I get more answers to questions?",
      answer: "Send an email to: contact.adress@ex.com"
    }
  ]

  interface IQuestionsResponse {
    id:number
    text:string
    createdAt:string
    answer:string
    respondedAt:string
  }
  const [questionsResponse, setQuestionsResponse] = useState<IQuestionsResponse[]>();
  const [isUpdate, setIsUpdate] = useState(false)
  useEffect(() => {
    let token = localStorage.getItem("token")
    if (token) {
      fetch(apiUrl + "questions", {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token === null ? "" : token,
        },
      })
      .then(resp => {
        CheckForError(resp.status)
        return resp.json()
      })
      .then(data => {
        setQuestionsResponse(data)
      })
      .catch((error) => {
        ShowError("Failed to download file", error.message)
      });
    }
  }, [isUpdate])

  async function AddNewQuestion() {
    let token = localStorage.getItem("token")
    fetch(apiUrl + "questions", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token === null ? "" : token,
      },
      body: JSON.stringify({
        text: newQuestionInputRef.current.value
      })
    })
    .then(resp => {
      CheckForError(resp.status)
      return resp.json()
    })
    .then(() => {
      setIsUpdate(!isUpdate)
      modalQuestionClose()
    })
    .catch((error) => {
      ShowError("Failed to add question/suggestion", error.message)
    });
  }

  const [alertText, setAlertText] = useState("Something went wrong")
  const [alertTitle, setAlertTitle] = useState("Error!")
  const [alertType, setAlertType] = useState("error")
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  function ShowError(text:string, title:string, type:string = "error") {
    setAlertType(type)
    setIsAlertOpen(false)
    setAlertText(text)
    setAlertTitle(title)
    setTimeout(() => {
      setIsAlertOpen(true)
    }, 250);
  }


  return (
    <>
      <section className="flex items-center flex-col">
        <h1 className="text-2xl font-semibold text-center lg:text-3xl mt-10">Frequently asked
          <span className="text-iconLight dark:text-iconDark ml-2">Questions</span>
        </h1>
        <div className="container max-w-5xl px-2 sm:px-6 py-10 mx-auto items-center flex flex-col gap-y-2">
          {questions.map((item, index) => (
            <div key={index} className="bg-backgroundThirdLight dark:bg-backgroundThirdDark 
            w-full rounded-md transition-all flex overflow-hidden">
              <div className="w-[4px] bg-iconLight dark:bg-iconDark"></div>
              <div className="w-[calc(100%-4px)]">
                <button className="peer group w-full flex justify-between items-center px-2 sm:px-4 py-2">
                  <span className="text-left text-base sm:text-lg font-semibold mr-1">{item.question}</span>
                  <div>
                    <svg className="w-3 h-3 transition-transform group-focus:-rotate-180" aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path className="stroke-textLight dark:stroke-textDark" strokeLinecap="round" 
                      strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                  </div>
                </button>
                <div className="grid grid-rows-[0fr] peer-focus:grid-rows-[1fr] peer-focus:pb-2 
                focus-within:grid-rows-[1fr] focus-within:pb-2 hover:grid-rows-[1fr] hover:pb-2" 
                style={{
                  transitionDuration: "0.25s",
                  transitionProperty: "grid-template-rows"
                }}>
                  <div className="ml-2 overflow-hidden text-base">- {item.answer}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {token ? (
        <section className="mb-10">
          <h1 className="text-2xl font-semibold text-center lg:text-3xl mt-0">Share any your question or idea</h1>
          {questionsResponse ? (
            <div className="container max-w-5xl px-2 sm:px-6 py-4 mx-auto items-center flex flex-col gap-y-2">
              {questionsResponse.map((item, index) => item.answer ? (
                <div key={index} className="bg-backgroundThirdLight dark:bg-backgroundThirdDark 
                w-full rounded-md transition-all flex overflow-hidden">
                  <div className="w-[4px] bg-iconLight dark:bg-iconDark"></div>
                  <div className="w-[calc(100%-4px)]">
                    <button className="peer group w-full flex justify-between items-center px-2 sm:px-4 py-2">
                      <span className="text-left text-base sm:text-lg font-semibold mr-1">{item.text}</span>
                      <div>
                        <svg className="w-3 h-3 transition-transform group-focus:-rotate-180" aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path className="stroke-textLight dark:stroke-textDark" strokeLinecap="round" 
                          strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                      </div>
                    </button>
                    <div className="grid grid-rows-[0fr] peer-focus:grid-rows-[1fr] peer-focus:pb-2 
                    focus-within:grid-rows-[1fr] focus-within:pb-2 hover:grid-rows-[1fr] hover:pb-2" 
                    style={{
                      transitionDuration: "0.25s",
                      transitionProperty: "grid-template-rows"
                    }}>
                      <div className="ml-2 overflow-hidden text-base">- {item.answer}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={index} className="bg-backgroundThirdLight dark:bg-backgroundThirdDark 
                w-full rounded-md transition-all flex overflow-hidden">
                  <div className="w-[4px] bg-borderLight dark:bg-borderDark"></div>
                  <div className="w-[calc(100%-4px)] flex justify-between items-center px-2 sm:pl-4 sm:pr-3 py-2">
                    <span className="text-left text-base sm:text-lg font-semibold mr-1">{item.text}</span>
                    <div>
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" 
                      className="w-5 h-5 fill-textLight dark:fill-textDark">
                        <path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0Zm0 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1-10 10Z"></path>
                        <path d="M13 11.586V6a1 1 0 0 0-2 0v6a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          <div className="flex justify-center">
            <button className="p-1 rounded-full bg-buttonLight dark:bg-buttonDark
            hover:bg-buttonHoverLight hover:dark:bg-buttonHoverDark transition-colors"
            onClick={modalQuestionOpen}>
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
              className="stroke-textLight dark:stroke-textDark h-8 w-8">
                <path d="M16 7v18M7 16h18" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px"></path>
              </svg>
            </button>
          </div>
        </section>
      ) : null}
      
      <section className="flex items-center flex-col">
        <h1 className="text-2xl font-semibold text-center lg:text-3xl mt-0">Where will we go next?</h1>
        <div className="flex items-center w-full px-1 mt-6 gap-x-3 shrink-0 sm:w-auto pb-10">
          <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm 
          transition-colors border border-borderLight dark:border-borderDark rounded-lg 
          gap-x-2 sm:w-auto bg-backgroundThirdLight dark:bg-backgroundThirdDark
          hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark font-medium"
          onClick={() => window.history.go(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            <span>Go back</span>
          </button>

          <button className="w-1/2 px-5 py-2 text-sm tracking-wide transition-colors rounded-lg shrink-0 sm:w-auto
          bg-buttonLight dark:bg-buttonDark hover:bg-buttonHoverLight hover:dark:bg-buttonHoverDark font-medium"
          onClick={() => navigate(token === undefined ? "/welcome" : "/disk/folder/main")}>
            Take me home
          </button>
        </div>
      </section>

      {/* Add question */}
      <Modal open={isQuestionModalOpen}
        onClose={modalQuestionClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={modalWindowStyle}>
          <div className="text-textLight dark:text-textDark p-4 rounded-lg
          bg-backgroundSecondLight dark:bg-backgroundSecondDark min-w-xs">
            <p className=" text-2xl font-semibold">Something new</p>
            <input className=" my-4 w-full border border-borderLight dark:border-borderDark 
            text-textLight text-sm rounded-lg block p-2 dark:focus:border-textDark
            focus:border-textLight bg-backgroundThirdLight dark:bg-backgroundThirdDark
            dark:placeholder-gray-400 dark:text-textDark "
            type="text" placeholder="question" ref={newQuestionInputRef}></input>
            <div className="flex justify-end text-base gap-2">
              <button className=" hover:bg-backgroundHoverLight hover:dark:bg-backgroundHoverDark
              px-4 rounded-full transition-colors"
              onClick={modalQuestionClose}>
                Calcel
              </button>
              <button className=" bg-buttonLight dark:bg-buttonDark rounded-full px-5 py-1
              hover:bg-buttonHoverLight hover:dark:bg-buttonHoverDark transition-colors"
              onClick={AddNewQuestion}>
                OK
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      
      <Suspense fallback={<div></div>}>
        <AlertButton open={isAlertOpen} text={alertText} title={alertTitle}
        type={alertType} close={() => setIsAlertOpen(false)}></AlertButton>
      </Suspense>
    </>
  );
}
 
export default DocsHelp;