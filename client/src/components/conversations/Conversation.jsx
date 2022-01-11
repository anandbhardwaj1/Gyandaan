
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const name=conversation.data;
  return (
    <div className="conversation" >
      <img
        className="conversationImg"
        src={
         " https://media.istockphoto.com/vectors/user-avatar-icon-sign-symbol-vector-id538748141?k=20&m=538748141&s=612x612&w=0&h=INss7HfK8ygPGlqelxxyqQjVUCJz16RehSYHYTCDX1g="
        }
        alt=""
      />
      <div>{name}</div>
     
    </div>
  );
}
