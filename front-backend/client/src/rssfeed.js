import React, { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import MOCK_DATA from './data.json'

export default function (props) {


return( 
    <rss version="2.0">
  <channel>
    <title>thingoftheday.xyz</title>
    <link>https://thingoftheday.xyz</link>
    
  </channel>

  <item>
    <title>This is my RSS feed!</title>
  </item>
</rss>	
)
}