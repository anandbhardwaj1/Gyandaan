# Gyandaan


`Gyandaan` is a platform that enables student to find perfect mentors curated to their educational needs. <br/>



Contents
========

 * [Installation](#installation)
 * [Tech-Stacks Used](#Tech-Stacks-Used)
 * [Features Added](#Features-Added)
 * [Snapshots](#Snapshots)


### Installation
---

1. Clone the repository
2. Open with code editor and run following commands on the terminal.
    + ` npm install `
    + `npm start`(client )
    + ` node index.js`(socket)
    + `node server.js`(server)
3. Open the localhost link.
<br/>
`.env file datas hasn't been pushed`
<br/>
You can provide your own env file of your razorpay account and mongodb database.

### Major Tech-Stacks Used
---
<ol>
<li> MongoDB
<li>Node
<br/>
<li>Express
<br/>
<li>ReactJS
<li>WebRTC +PeerJS
<br/>
<li>Socket.IO
<br/>
<li>API (Razorpay Payment API ,Youtube API)
<br/>
</ol>

### Features Added
---
<ol>
    
<li>Requirements - Mentees can add their own needs(topics)
and search for mentors accordingly. This has been
provided to give mentees a say in the process,
allowing them to select particular mentors according to their needs.</li></br>
<li>Mentor Match - Based on the profile details of mentees, a suitable
mentorlist is recommended to them.
In order to satisfy the needs of the mentees,
matching the right participants together is an
important step for best results.</li></br>
<li>Communications tools:
<ol>
<li>Chat - A chat feature on the website, where mentors and
mentees can communicate and initiate conversation.
As effective communication is essential to building a
trusting and strong mentoring relationship.</li></br>
<li>Video Call - A video call feature is also on the website,
where mentors can take classes and solve the doubts.</li></br>
</ol>
</li></br>
<li>Progress Track - Mentors can provide a completion percent, which will
give mentees an estimate of how long it will take them to
finish the mentoring session. Also they can track their
performance and improve it if they are lagging
behind.After completion of the mentorship programme,
depending upon the performance mentees can remove those topics
from their profile.</li></br>
<li>Notification - A live chat notification channel is established between mentors and mentees which is used to notify
the arrival of new messages. 
</li></br>
<li>Reviews - Mentees can review the mentors with whom they
have enrolled. This will also assist all new commers
in learning more about the mentors, as well as
motivate mentors to improve their performance in
order to receive better reviews.</li></br>
<li>
Recommendation- Youtube api is used to recommend some video lectures to mentees
according to his requirements.
</li></br>
<li>Payment Gateway - A payment gateway where the
mentees/mentors can donate. It is implemented using Razorpay
API where the payment can be
done via card,upi,bank details etc.</li></br>
</ol>

