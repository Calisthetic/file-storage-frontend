import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface IQuestions {
  question: string
  answer: string
}
const DocsHelp: FunctionComponent = () => {
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
                    <svg className="w-3 h-3 transition-transform group-focus:rotate-180" aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path className="stroke-textLight dark:stroke-textDark" strokeLinecap="round" 
                      strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                  </div>
                </button>
                <div className="grid grid-rows-[0fr] peer-focus:grid-rows-[1fr] peer-focus:pb-2" 
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
    </>
  );
}
 
export default DocsHelp;