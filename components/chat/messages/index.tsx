"use client";

import dynamic from "next/dynamic";
import type { ChatStatus, UIMessage } from "ai";

import ChatScroll from "@/components/chat/chat-scroll";
import UserMessage from "./user-message";
import TypingIndicator from "./typing-indicator";

const AssistantMessage = dynamic(
    () => import("./assistant-message"),
    {
        loading: () => null,
    }
);

type MessagesProps = {
    messages: UIMessage[];
    status: ChatStatus;
};

export default function Messages({
                                     messages,
                                     status,
                                 }: MessagesProps) {
    return (
        <ChatScroll>
            <div className="flex min-h-0 flex-col space-y-6">
                {messages.map((message) => {
                    const content = message.parts
                        .filter((part) => part.type === "text")
                        .map((part) => part.text)
                        .join("");

                    if (!content) return null;

                    return message.role === "user" ? (
                        <UserMessage
                            key={message.id}
                            content={content}
                        />
                    ) : (
                        <AssistantMessage
                            key={message.id}
                            content={content}
                        />
                    );
                })}

                {(status === "submitted" || status === "streaming") && (
                    <TypingIndicator />
                )}
            </div>
        </ChatScroll>
    );
}











// import type { ChatStatus, UIMessage } from "ai";
//
// import ChatScroll from "@/components/chat/chat-scroll";
// import AssistantMessage from "./assistant-message";
// import UserMessage from "./user-message";
// import TypingIndicator from "./typing-indicator";
//
// type MessagesProps = {
//     messages: UIMessage[];
//     status: ChatStatus;
// };
//
// export default function Messages({
//                                      messages,
//                                      status,
//                                  }: MessagesProps) {
//     return (
//         <ChatScroll>
//             <div className="flex min-h-0 flex-col space-y-6">
//                 {messages.map((message) => {
//                     const content = message.parts
//                         .filter((part) => part.type === "text")
//                         .map((part) => part.text)
//                         .join("");
//
//                     if (!content) return null;
//
//                     return message.role === "user" ? (
//                         <UserMessage
//                             key={message.id}
//                             content={content}
//                         />
//                     ) : (
//                         <AssistantMessage
//                             key={message.id}
//                             content={content}
//                         />
//                     );
//                 })}
//
//                 {(status === "submitted" || status === "streaming") && (
//                     <TypingIndicator />
//                 )}
//             </div>
//         </ChatScroll>
//     );
// }



// "use client";
//
// import type { ChatStatus, UIMessage } from "ai";
//
// import ChatScroll from "@/components/chat/chat-scroll";
// import AssistantMessage from "./assistant-message";
// import UserMessage from "./user-message";
// import TypingIndicator from "./typing-indicator";
//
// type MessagesProps = {
//     messages: UIMessage[];
//     status: ChatStatus;
// };
//
// export default function Messages({ messages, status }: MessagesProps) {
//     return (
//         <ChatScroll>
//             <div className="flex flex-col space-y-6">
//                 {messages.map((message) => {
//                     const content = message.parts
//                         .filter((part) => part.type === "text")
//                         .map((part) => part.text)
//                         .join("");
//
//                     if (!content) return null;
//
//                     return message.role === "user" ? (
//                         <UserMessage
//                             key={message.id}
//                             content={content}
//                         />
//                     ) : (
//                         <AssistantMessage
//                             key={message.id}
//                             content={content}
//                         />
//                     );
//                 })}
//
//                 {(status === "submitted" || status === "streaming") && (
//                     <TypingIndicator />
//                 )}
//             </div>
//         </ChatScroll>
//     );
// }