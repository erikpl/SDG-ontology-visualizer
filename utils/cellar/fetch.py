#!/usr/bin/env python

"""
Download the metadata for all cellar documents from the policy-sdg mapping csv.
Stores downloaded files in the 'xml' folder and saves downloaded ids in the 'downloaded.txt' file to allow
the script to resume downloading without starting from the beginning.

Be warned that many cellar files take in the vicinity of 30s to download, so the full download
will take several hours.

Will crash if the required files and folders are not present, can't be arsed to fix that.
"""

import csv
import requests
import time

downloaded = []

# Read downloaded files from text file
with open('downloaded.txt', 'r') as f:
    for line in f:
        downloaded.append(line.strip())

celex_ids = []

# Read celex ids from policies file, 23rd column
with open('policies.csv', 'r') as f:
    reader = csv.reader(f, delimiter=';')
    
    # Skip header line
    reader.__next__()
    for row in reader:
        celex_ids.append(row[22].strip())

remaining = list(filter(lambda x: x not in downloaded, celex_ids))
count = len(downloaded)

# Download remaining files
for celex_id in remaining:
    start_time = time.time()
    id = celex_id.replace('(', '%28').replace(')', '%29')
    url = f"http://publications.europa.eu/resource/celex/{id}?language=eng"
    headers = {
        'Accept': 'application/xml;notice=tree',
    }

    response = requests.get(url, headers=headers)
    end_time = time.time()

    # Write to file
    with open(f'xml/{celex_id}.xml', 'w') as f:
        f.write(response.text)
    
    # Write to text file
    with open('downloaded.txt', 'a') as f:
        f.write(f'{celex_id}\n')    


    count += 1
    print(f"Fetch {celex_id} [{count}/{len(celex_ids)}] ({(end_time - start_time):.2f}s)")
