import csv
import json
import os

def filter_news():
    input_file = 'data/download/RedditNews.csv'
    output_file = 'data/news.json'
    
    if not os.path.exists('data'):
        os.makedirs('data')

    news_data = []

    with open(input_file, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            date = row['Date']
            if date.startswith('2016'):
                news_data.append({
                    "Date": date,
                    "News": row['News']
                })

    with open(output_file, mode='w', encoding='utf-8') as f:
        json.dump(news_data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    filter_news()