import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || 'Rohit_patil_';

    const query = `
    query userProfileCalendar($username: String!, $year: Int) {
      matchedUser(username: $username) {
        userCalendar(year: $year) {
          activeYears
          streak
          totalActiveDays
          dccBadges {
            timestamp
            badge {
              name
              icon
            }
          }
          submissionCalendar
        }
      }
    }
  `;

    try {
        const response = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com',
                'User-Agent': 'Mozilla/5.0'
            },
            body: JSON.stringify({
                query,
                variables: { username },
            }),
            // Cache for 1 hour to avoid rate limiting
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch from LeetCode API: ${response.status}`);
        }

        const data = await response.json();

        if (data.errors) {
            throw new Error(`LeetCode API returned errors: ${data.errors[0].message}`);
        }

        const userCalendar = data.data?.matchedUser?.userCalendar;

        if (!userCalendar || !userCalendar.submissionCalendar) {
            return NextResponse.json({
                contributions: [],
                streak: 0,
                totalActiveDays: 0
            });
        }

        // Parse the submissionCalendar map: {"timestamp": count}
        const submissionCalendar = JSON.parse(userCalendar.submissionCalendar);

        // Convert to array of { date, count, level } required by react-activity-calendar
        const contributions = Object.entries(submissionCalendar).map(([timestamp, count]) => {
            // LeetCode timestamps are in seconds
            const date = new Date(parseInt(timestamp) * 1000);
            const dateString = date.toISOString().split('T')[0];
            const countNum = parseInt(count as string);

            // Calculate level based on count (0-4 like GitHub)
            // This is subjective, adjust thresholds as needed
            let level = 0;
            if (countNum > 0) level = 1;
            if (countNum > 2) level = 2;
            if (countNum > 4) level = 3;
            if (countNum > 6) level = 4;

            return {
                date: dateString,
                count: countNum,
                level: level,
            };
        });

        // Sort contributions by date
        contributions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return NextResponse.json({
            contributions,
            streak: userCalendar.streak,
            totalActiveDays: userCalendar.totalActiveDays
        });

    } catch (error) {
        console.error('Error fetching LeetCode calendar:', error);
        return NextResponse.json({ error: 'Failed to fetch LeetCode data' }, { status: 500 });
    }
}
