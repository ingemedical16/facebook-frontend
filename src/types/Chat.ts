export enum ChatType  {
    private = "private",
    group = "group",
  };

export type Message = {
    _id?: string;
    sender: string;
    content: string;
    timestamp: Date;
  }

  export type Chat<T=string[]> =  {
    type: ChatType;
    name?: string; // Optional for groups
    owner:string
    members: T; // Members in the chat
    messages: Message[];
  }
  