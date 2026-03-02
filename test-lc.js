
async function run() {
    const query = `
    query userProfileCalendar($username: String!, $year: Int) {
      matchedUser(username: $username) {
        userCalendar(year: $year) {
          submissionCalendar
        }
      }
    }
  `;
    const res = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Referer': 'https://leetcode.com'
        },
        body: JSON.stringify({
            query,
            variables: { username: "Rohit_patil_" }
        })
    });
    const data = await res.json();
    console.log(data.data.matchedUser.userCalendar.submissionCalendar.substring(0, 100));
}
run();
