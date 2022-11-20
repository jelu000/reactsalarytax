import React, { Component } from 'react';
import axios from 'axios';

//https://skatteverket.entryscape.net/rowstore/dataset/88320397-5c32-4c16-ae79-d36d95b17b95/json?år=2021
//https://skatteverket.entryscape.net/rowstore/dataset/88320397-5c32-4c16-ae79-d36d95b17b95/json
//https:stackoverflow.com/questions/47658765/objects-are-not-valid-as-a-react-child-found-object-promise
export default class maincomponent extends Component {

    constructor(props){
      super(props);

      this.state={
        serverdatastring: "",
        serverdataobj: {}
      };
    }

    renderPosts = async() => {
      const baseURL  = 
      'https://skatteverket.entryscape.net/rowstore/dataset/88320397-5c32-4c16-ae79-d36d95b17b95/json?år=2020&tabellnr=30';
      try {
        const res = await axios.get(baseURL);
        const posts = res.data;
    
        // this will re render the view with new data
        this.setState({
          serverdatastring: posts
        });
      } catch (err) {
        console.log(err);
      }
    }

    async componentDidMount(){
      this.renderPosts();
      //const baseURL  = 'https://skatteverket.entryscape.net/rowstore/dataset/88320397-5c32-4c16-ae79-d36d95b17b95/json?år=2020';
    }
    
   render() { 
   
    const posts = this.state.serverdatastring['results']?.map((post, i) => (
      <li key={i} className="list-group-item:">Tabellnr:{post.tabellnr} inkomst mellan: {post["inkomst fr.o.m."]} - {post["inkomst t.o.m."]}kr, skatt att betala {post["kolumn 1"]} kr </li>
    )); 
    
    return (
      
      <div>
        <h3>Skatteverket</h3>
        <p>
          Denna sida har jag gjort för att visa hur man kan hämta data
          från Skatteverkets rest api i React. Mer förklaring om tabellernas
          kolumner finns hos Skatteverket:
        
        </p>
        <p><a href='https://www.skatteverket.se/privat/skatter/arbeteochinkomst/askattsedelochskattetabeller/salaserdutabellen.4.319dc1451507f2f99e875f.html'>
          https://www.skatteverket.se/privat/skatter/arbeteochinkomst/askattsedelochskattetabeller/salaserdutabellen.4.319dc1451507f2f99e875f.html
          </a>
        </p>
        <div>
          {posts}
        </div>
      </div>
    )
  }
}
