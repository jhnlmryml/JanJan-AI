import type { ChatStatus, UIMessage } from "ai";

import EmptyState from "@/components/chat/empty-state";
import Messages from "@/components/chat/messages";

type ConversationProps = {
    messages: UIMessage[];
    status: ChatStatus;
};

export default function Conversation({
                                         messages,
                                         status,
                                     }: ConversationProps) {
    const isEmpty = messages.length === 0;

    return (
        <section
            className="
                flex
                min-h-0
                min-w-0
                w-full
                flex-1
                overflow-hidden
            "
        >
            {isEmpty ? (
                <EmptyState />
            ) : (
                <div
                    className="
                        container-chat
                        relative
                        flex
                        min-h-0
                        min-w-0
                        w-full
                        flex-1
                        overflow-hidden
                    "
                >
                    <Messages
                        messages={messages}
                        status={status}
                    />
                </div>
            )}
        </section>
    );
}


// "use client";
//
// import type {ChatStatus, UIMessage} from "ai";
//
// import EmptyState from "@/components/chat/empty-state";
// import Messages from "@/components/chat/messages";
//
// type ConversationProps = {
//     messages: UIMessage[];
//     status: ChatStatus;
// };
//
// export default function Conversation({
//                                          messages,
//                                          status,
//                                      }: ConversationProps) {
//     const isEmpty = messages.length === 0;
//
//     return (
//         <section className="flex  h-full min-h-0 w-full flex-1 overflow-hidden">
//             {isEmpty ? (
//                 <EmptyState/>
//             ) : (
//                 <div className="container-chat relative flex min-h-0 flex-1 w-full">
//                     <Messages
//                         messages={messages}
//                         status={status}
//                     />
//                 </div>
//             )}
//         </section>
//     );
// }
