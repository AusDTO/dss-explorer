import os
import re


class Goal:
    def __init__(self):
        self.number = ""
        self.summary = ""
        self.description = ""
        self.reason = ""
        self.advice = ""


def readGoal(contents):
    goal = Goal()

    # Point relative links to the DTA website
    contents = contents.replace(
        'a href="/', 'a target="_blank" href="https://www.dta.gov.au/')
    reg1 = re.compile("<li>([0-9]*)[ .]*([A-Z].*)</li>")
    m = reg1.search(contents)
    goal.number = m.group(1).strip() or "10"
    goal.summary = m.group(2).strip()
    contents = contents[m.end(2):]
    reg2 = re.compile('<p class="criteria-subtitle">(.*?)</p>')
    m2 = reg2.search(contents)
    goal.description = m2.group(1).strip()
    contents = contents[m2.end(1):]

    reg3 = re.compile('</h2>(.*?)<h2', re.MULTILINE | re.DOTALL)
    m3 = reg3.search(contents)
    goal.reason = m3.group(1).strip()
    contents = contents[m3.end(1):]

    reg4 = re.compile('</h2>(.*?)(<h2|</div>)', re.MULTILINE | re.DOTALL)
    m4 = reg4.search(contents)
    goal.advice = m4.group(1).strip()
    contents = contents[m4.end(1):]
    return goal


def main():
    current_path = os.path.dirname(os.path.abspath(__file__))
    goals = list()
    for file_name in os.listdir(current_path):
        if file_name.endswith("htm"):
            with open(os.path.join(current_path, file_name), "r") as f:
                goals.append(readGoal(f.read()))

    print('export const Goals = [')
    for goal in sorted(goals, key=lambda x: int(x.number)):
        print(f"""{{
    number: "{goal.number}",
    summary: "{goal.summary}",
    description: `{goal.description}`,
    reason: `{goal.reason}`,
    advice: `{goal.advice}`
        }},""")
    print(']')


if __name__ == '__main__':
    main()
