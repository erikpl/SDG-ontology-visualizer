#!/usr/bin/env
import csv
import json

"""
Author: Sebastian Ellefsen
This script extracts the relations from policy documents to SDGs and targets and
writes them to JSON files.
Reads from csv files created from the excel files provided by JRC.

Does not check for file existence and will crash if the csv file does not exist.
To use other input files, change the input_file variable

Output is written to two files:
    - targets.json: A key-value map with the celex number as key and its goals and targets as the value
    - targets_arr.json: An array of objects with the celex number inline with the goals and targets

Output files are prefixed with the output_prefix variable.
"""

input_file = 'processed_results_vdl_initiatives.csv'
output_prefix = ''

policies = {}
with open(input_file, 'r') as f:
    reader = csv.reader(f, delimiter=';')
    # Skip header
    reader.__next__()

    for row in reader:
        celex_id = row[11]
        target = row[2]
        
        # The target column contains the target on the format 'goal.target'
        goal, target = target.split('.')
        if celex_id not in policies:
            policies[celex_id] = {
                'goals': set(),
                'targets': dict()
            }

        policies[celex_id]['goals'].add(goal)
        if goal not in policies[celex_id]['targets']:
            policies[celex_id]['targets'][goal] = set()
        policies[celex_id]['targets'][goal].add(target)

# Make policies JSON serializable by converting sets to lists
for celex_id, policy in policies.items():
    policy['goals'] = list(policy['goals'])
    for goal, targets in policy['targets'].items():
        policy['targets'][goal] = list(targets)

# Save policies to targets.json
with open(output_prefix + 'targets.json', 'w') as f:
    json.dump(policies, f, indent=4)

# Save as array
arr = [{'policy': policy, 'goals': data['goals'], 'targets': data['targets']} for policy, data in policies.items()]
with open(output_prefix + 'targets_arr.json', 'w') as f:
    json.dump(arr, f, indent=4)