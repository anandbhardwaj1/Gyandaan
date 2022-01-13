import React from 'react'
import "./test.css"
import { Link } from "react-router-dom";


export default function Cards({posts}) {
    return (
        <div>
<section id="scholastic-courses">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <h1>Mentors</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
            </div>
            <div className="row">
            {posts.map((p,i) => (
                <div className="col-lg-6" key={i}>
                <div className="card-deck">
                    <div className="card border-dark mb-3" style={{width: "30rem"}}>
                        <img className="card-img-top" src="https://content3.jdmagicbox.com/comp/bangalore/c5/080pxx80.xx80.180823122033.c8c5/catalogue/play-arena-sports-and-adventure-pvt-ltd-kasavanahalli-bangalore-camera-dealers-egyxxgbyli.jpg"/>
                        <div className="card-body">
                        <h4 className="card-title">{p.name}</h4>
                        <p className="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus, corporis nesciunt exercitationem ea iste, dolorum adipisci necessitatibus, explicabo ipsam est veniam voluptate odio quo accusantium error commodi sequi quia vel!</p>
                        <Link to={`/Profile/${p._id}`} className="btn btn-primary">Visit</Link>
                        <a href="/" className="btn btn-outline">Details</a>
                        </div>
                    </div>
                    </div>
                   </div>
                                    
      ))}
                <div className="col-lg-6">
            <div className="card-deck">
                <div className="card border-dark mb-3" style={{width: "30rem"}}>
                    <img className="card-img-top" src="https://content3.jdmagicbox.com/comp/bangalore/c5/080pxx80.xx80.180823122033.c8c5/catalogue/play-arena-sports-and-adventure-pvt-ltd-kasavanahalli-bangalore-camera-dealers-egyxxgbyli.jpg"/>
                    <div className="card-body">
                    <h4 className="card-title">Name</h4>
                    <p className="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus, corporis nesciunt exercitationem ea iste, dolorum adipisci necessitatibus, explicabo ipsam est veniam voluptate odio quo accusantium error commodi sequi quia vel!</p>
                    <a href="/" className="btn btn-primary">REGISTER</a>
                    <a href="/" className="btn btn-outline">SYLLABUS</a>
                    </div>
                </div>
                </div>
               </div>
               </div>
            </div>
    </section>
            
        </div>
    )
}