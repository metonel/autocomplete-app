import React, { useState } from 'react';
import './SearchComponent.css';

type SearchComponentProps = {
    sports: {
        name: string
        htmlCode: string[]        
    }[]
}

export default function SearchComponent(props: SearchComponentProps)  {    
    const [display, setDisplay] = useState(false);
    const [search, setSearch] = useState('');

    const updateSearchList = (sportName: string) => {
        setSearch(sportName);
        setDisplay(false);
      };

    return (
        <div className="flex-container flex-column pos-rel">
            <input
                id="auto"
                placeholder="Type to search"
                value={search}
                onClick={() => setDisplay(!display)}
                onChange={event => setSearch(event.target.value)}
            />
            {display && (
            <div className="autoContainer">
                {props.sports
                .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
                .map((sport, i) => {
                    const textToHighlight = new RegExp(search, "g");
                    const highlightedSportName = sport.name.replace(textToHighlight, (match) => `<mark>${match}</mark>`);
                    return (
                    <div
                        onClick={() => updateSearchList(sport.name)}
                        className="option"
                        key={i}
                    >
                        <span dangerouslySetInnerHTML={{__html: highlightedSportName}}></span>
                        <span dangerouslySetInnerHTML={{__html: sport.htmlCode[0]}}></span>
                    </div>
                    );
                })}
            </div>
            )}
        </div>
    );
}