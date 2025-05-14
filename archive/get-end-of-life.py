"""
This is the original proof-of-concept for Lifeline. I originally
wrote it to get familiar with the end-of-life API and to
prove that it is indeed possible to get and parse info from it.

The original idea was to use Jenkins to run (what would have
been) a further developed version of this script which would
have created JIRA tickets which then could be placed into an
EPIC, which then would have created a Gantt chart in JIRA.

Despite then learning how to use the JIRA API I discovered that
I didn't have the JIRA permissions to do this 😅

After being stumped for a bit, I decided to just make a web
based dashboard instead which I figured would allow for more
interactivity and user control anyway, and would have been
more helpful for general public use anyway. So, one thing lead
to another, and now we have Lifeline.

This script was created in August 2024.
"""

import sys
import requests
from thefuzz import fuzz
from datetime import date

def ticket_creation_template(title, description):
    print("Not yet implemented")
    return

# check if there are dependencies specified
input_args = sys.argv
if len(input_args) <= 1:
    print("No dependency specified. Exiting...")
    sys.exit(1)

HELP_INFO = """
Usage: python3 get-end-of-life.py [-h] [-a]

-h: Show this help menu and exit
-a: Show all dates (except unknown)
-u: Show unknown dates
-i: [Insecure] Ignore SSL
"""

# ARGUMENT SIGNALS
SHOW_ALL_DATES = False
VERIFY = True
SHOW_UNKNOWN = False

for argument in input_args[1:]:
    if argument.startswith("-"):
        for signal in argument[0:]:
            if signal == "h":
                print(HELP_INFO)
                sys.exit(0)
            if signal == "a":
                print("SHOWING ALL DATES")
                SHOW_ALL_DATES = True
            if signal == "i":
                print("IGNORING SSL")
                VERIFY = False
            if signal == "u":
                print("SHOWING UNKNOWN EOL DATES")
                SHOW_UNKNOWN = True


# CONST VARS
END_OF_LIFE_DOMAIN = "https://endoflife.date"
EOL_API_ENDPOINT = END_OF_LIFE_DOMAIN + "/api"
LIST_ALL_DEPENDENCIES_URL = EOL_API_ENDPOINT + "/all.json"

# STORAGE VARS
FULL_DEPENDENCY_LIST = []
REQUESTED_DEPENDENCY_LIST = []
FOUND_ANY_DEPENDENCY = False

# Get all dependencies from endoflife.date
print("Getting all dependencies from endoflife.date...")
try:
    response = requests.get(LIST_ALL_DEPENDENCIES_URL, verify=VERIFY)
    if response.status_code == 200:
        FULL_DEPENDENCY_LIST = response.json()
    else:
        print("Error: " + response.text)
except Exception as e:
    print("Error: " + str(e))

# Go through all the dependencies and find matches
for dependency in FULL_DEPENDENCY_LIST[0:]:
    for argument in input_args[1:]:
        fuzz_confidence = fuzz.ratio(argument, dependency)
        # If the fuzz_confidence is above 70% then add the dependency to the list
        if fuzz_confidence > 70:
            FOUND_ANY_DEPENDENCY = True
            print("Match: " + argument + " → " + dependency + " with " + str(fuzz_confidence) + "% confidence")
            REQUESTED_DEPENDENCY_LIST.append(dependency)

if FOUND_ANY_DEPENDENCY == False:
    print("No matches found for specified dependencies")
    sys.exit(1)

# for each of the found dependencies, get the end of life date
for dependency in REQUESTED_DEPENDENCY_LIST:
    dependency_end_of_life = ""
    ANY_UNKNOWNS = False

    # try and get the dependency JSON. If it fails, print the error
    try:
        response = requests.get(EOL_API_ENDPOINT + "/" + dependency + ".json", verify=VERIFY)
        if response.status_code == 200:
            RESPONSE = response.json()
        else:
            print("Error: " + response.text)
    except Exception as e:
        print("Error: " + str(e))

    print("---------- " + ("All" if SHOW_ALL_DATES else "Future") + " " + dependency + " EOL dates ----------")

    for response in RESPONSE[0:]:
        if response.get("eol") != False and response.get("eol") != True:
            split_eol = response.get("eol").split("-")
            eol_as_date = date(int(split_eol[0]), int(split_eol[1]), int(split_eol[2]))
            if SHOW_ALL_DATES:
                print(dependency + " " + response.get("cycle") + ": " + response.get("eol"))
            else:
                today = date.today()
                if today < eol_as_date:
                    print(dependency + " " + response.get("cycle") + ": " + response.get("eol"))
        else:
            ANY_UNKNOWNS = True
    if ANY_UNKNOWNS:
        print("    → entries with unknown dates")
        for response in RESPONSE[0:]:
            if response.get("eol") == False or response.get("eol") == True:
                print(dependency + " " + response.get("cycle") + ": unknown")
