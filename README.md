# r/2016 Archive

A web-based digital time capsule designed to replicate the 2016 Reddit aesthetic. This project aggregates news, music, and cinema data from 2016 into a searchable, interactive interface.

## Features

* **Live Clock**: Displays the current time synced to the year 2016.
* **Search**: Real-time filtering for headlines, artists, or movie titles.
* **Responsive Header & Footer**: Fixed navigation and credit bars that adapt to desktop, tablet, and mobile screens.
* **Floating Jukebox**: A draggable YouTube player popup for background music while browsing.

## Categories

| Category | Description | Data Source |
| --- | --- | --- |
| **News** | Chronologically sorted headlines from 2016. | https://www.kaggle.com/datasets/aaron7sun/stocknews |
| **Songs** | Billboard Year-End Hot 100 singles with direct YouTube links. | https://en.wikipedia.org/wiki/Billboard_Year-End_Hot_100_singles_of_2016 |
| **Movies** | Top films of the year with distributor details and IMDb links. | https://en.wikipedia.org/wiki/2016_in_film |

<b>Note:</b> Wikipedia tables downloaded as CSV via using https://github.com/ismailoksuz/Browser-Extensions/tree/main/wiki-table-downloader .

## Technical Architecture

### Frontend

* **index.html**: Core structure and navigation.
* **style.css**: Custom CSS providing a 2016-era Reddit theme and full responsiveness via media queries.
* **script.js**: Handles tab switching, data fetching, search filtering, and the live 2016 clock.
* **player.html**: Independent component for the draggable YouTube API integration.

### Backend / Processing

* **scripts/filterNews.py**: Python script that processes the raw RedditNews.csv to filter for 2016 entries and exports news.json.
* **scripts/openUrl.py**: Utility for manual verification of AI-generated YouTube links.
* **prompts/**: Contains instruction sets (getMovie.txt, getSongLink.txt) used to transform CSV data into structured JSON via AI.

## Installation and Usage

1. Clone the repository.
2. Ensure the following data files are present in the `data/` directory:
* news.json
* songLinks.json
* movie.json


3. Use a local server (e.g., VS Code Live Server) to open `index.html`. This is required for the Fetch API and YouTube Iframe API to function correctly.

## Credits

Created by [İsmail ÖKSÜZ](https://www.github.com/ismailoksuz).