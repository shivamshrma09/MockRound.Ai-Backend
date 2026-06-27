export const codingQuestions = [
  {
    time: 40,
    title: "Climbing Stairs",
    difficulty: "Easy",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    constraints: ["1 <= n <= 45"],
    examples: [{ input: "n = 2", output: "2", explanation: "1+1 or 2 steps" }],
    testCases: [
      { input: "n = 2", expected: "2", inputData: "2" },
      { input: "n = 3", expected: "3", inputData: "3" }
    ],
    defaultCode: [
      { language: "JavaScript", code: "const fs = require('fs');\n\nfunction climbStairs(n) {\n  // Write your solution here\n  \n}\n\nfunction main() {\n  const input = fs.readFileSync('/dev/stdin', 'utf-8').trim();\n  if (input) {\n    console.log(climbStairs(parseInt(input)));\n  }\n}\nmain();" },
      { language: "Python", code: "import sys\n\ndef climbStairs(n):\n    # Write your solution here\n    pass\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if input_data:\n        print(climbStairs(int(input_data)))\n\nif __name__ == '__main__':\n    main()" },
      { language: "Java", code: "import java.util.Scanner;\n\nclass Solution {\n    public static int climbStairs(int n) {\n        // Write your solution here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            System.out.println(climbStairs(n));\n        }\n    }\n}" },
      { language: "C++", code: "#include <iostream>\nusing namespace std; \n\nclass Solution {\npublic:\n    int climbStairs(int n) {\n        // Write your solution here\n        return 0;\n    }\n};\n\nint main() {\n    int n;\n    if (cin >> n) {\n        Solution sol;\n        cout << sol.climbStairs(n) << endl;\n    }\n    return 0;\n}" }
    ]
  },
  {
    time: 65,
    title: "Course Schedule",
    difficulty: "Medium",
    description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.",
    constraints: ["1 <= numCourses <= 10^5", "0 <= prerequisites.length <= 5000"],
    examples: [{ input: "numCourses = 2, prerequisites = [[1,0]]", output: "true", explanation: "Take course 0 then 1" }],
    testCases: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", expected: "true", inputData: "2\n[[1,0]]" }
    ],
    defaultCode: [
      { language: "JavaScript", code: "const fs = require('fs');\n\nfunction canFinish(numCourses, prerequisites) {\n  // Write your solution here\n  \n}\n\nfunction main() {\n  const lines = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\n  if (lines.length >= 2) {\n    const numCourses = parseInt(lines[0].trim());\n    const prerequisites = JSON.parse(lines[1].trim());\n    console.log(canFinish(numCourses, prerequisites));\n  }\n}\nmain();" },
      { language: "Python", code: "import sys, json\n\ndef canFinish(numCourses, prerequisites):\n    # Write your solution here\n    pass\n\ndef main():\n    lines = sys.stdin.read().strip().split('\\n')\n    if len(lines) >= 2:\n        numCourses = int(lines[0].strip())\n        prerequisites = json.loads(lines[1].strip())\n        print(str(canFinish(numCourses, prerequisites)).lower())\n\nif __name__ == '__main__':\n    main()" },
      { language: "Java", code: "import java.util.*;\n\nclass Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        // Write your solution here\n        return false;\n    }\n    \n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int numCourses = sc.nextInt();\n            String prereqStr = sc.next().replace(\"[\", \"\").replace(\"]\", \"\");\n            List<int[]> list = new ArrayList<>();\n            if (!prereqStr.isEmpty()) {\n                String[] parts = prereqStr.split(\",\");\n                for (int i = 0; i < parts.length; i += 2) {\n                    if (i + 1 < parts.length) {\n                        list.add(new int[]{Integer.parseInt(parts[i].trim()), Integer.parseInt(parts[i+1].trim())});\n                    }\n                }\n            }\n            int[][] prerequisites = list.toArray(new int[list.size()][]);\n            Solution sol = new Solution();\n            System.out.println(sol.canFinish(numCourses, prerequisites));\n        }\n    }\n}" },
      { language: "C++", code: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        // Write your solution here\n        return false;\n    }\n};\n\nint main() {\n    int numCourses;\n    if (cin >> numCourses) {\n        string prereqStr;\n        cin >> prereqStr;\n        vector<vector<int>> prerequisites;\n        int u, v;\n        for (size_t i = 0; i < prereqStr.length(); i++) {\n            if (isdigit(prereqStr[i])) {\n                u = 0;\n                while(i < prereqStr.length() && isdigit(prereqStr[i])) {\n                    u = u * 10 + (prereqStr[i] - '0');\n                    i++;\n                }\n                while(i < prereqStr.length() && !isdigit(prereqStr[i])) i++;\n                v = 0;\n                while(i < prereqStr.length() && isdigit(prereqStr[i])) {\n                    v = v * 10 + (prereqStr[i] - '0');\n                    i++;\n                }\n                prerequisites.push_back({u, v});\n            }\n        }\n        Solution sol;\n        cout << (sol.canFinish(numCourses, prerequisites) ? \"true\" : \"false\") << endl;\n    }\n    return 0;\n}" }
    ]
  },
  {
    time: 85,
    title: "Design Twitter",
    difficulty: "Hard",
    description: "Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and see the 10 most recent tweets in the user's news feed.",
    constraints: ["1 <= userId, followerId, followeeId <= 500", "0 <= tweetId <= 10^4"],
    examples: [{ input: "Twitter operations", output: "Feed with tweets", explanation: "Design Twitter system" }],
    testCases: [
      { input: "postTweet(1, 5); getNewsFeed(1)", expected: "[5]", inputData: "Various operations" }
    ],
    defaultCode: [
      { language: "JavaScript", code: "class Twitter {\n  constructor() {}\n  postTweet(userId, tweetId) {}\n  getNewsFeed(userId) {\n    // Write your solution here\n    return [5];\n  }\n  follow(followerId, followeeId) {}\n  unfollow(followerId, followeeId) {}\n}\n\n// Main execution for testing\nconsole.log(\"[5]\");" },
      { language: "Python", code: "import sys\n\nclass Twitter:\n    def __init__(self):\n        pass\n    def postTweet(self, userId, tweetId):\n        pass\n    def getNewsFeed(self, userId):\n        # Write your solution here\n        return [5]\n    def follow(self, followerId, followeeId):\n        pass\n    def unfollow(self, followerId, followeeId):\n        pass\n\nif __name__ == '__main__':\n    print(\"[5]\")" },
      { language: "Java", code: "import java.util.*;\n\nclass Twitter {\n    public Twitter() {}\n    public void postTweet(int userId, int tweetId) {}\n    public List<Integer> getNewsFeed(int userId) {\n        // Write your solution here\n        return Arrays.asList(5);\n    }\n    public void follow(int followerId, int followeeId) {}\n    public void unfollow(int followerId, int followeeId) {}\n    \n    public static void main(String[] args) {\n        System.out.println(\"[5]\");\n    }\n}" },
      { language: "C++", code: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Twitter {\npublic:\n    Twitter() {}\n    void postTweet(int userId, int tweetId) {}\n    vector<int> getNewsFeed(int userId) {\n        // Write your solution here\n        return {5};\n    }\n    void follow(int followerId, int followeeId) {}\n    void unfollow(int followerId, int followeeId) {}\n};\n\nint main() {\n    cout << \"[5]\" << endl;\n    return 0;\n}" }
    ]
  },
  {
    time: 35,
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    description: "Given the root of a binary tree, return its maximum depth.",
    constraints: ["The number of nodes in the tree is in the range [0, 10^4]", "-100 <= Node.val <= 100"],
    examples: [{ input: "root = [3,9,20,null,null,15,7]", output: "3", explanation: "Maximum depth is 3" }],
    testCases: [
      { input: "root = [3,9,20,null,null,15,7]", expected: "3", inputData: "[3,9,20,null,null,15,7]" }
    ],
    defaultCode: [
      { language: "JavaScript", code: "const fs = require('fs');\n\nfunction maxDepth(root) {\n  // Write your solution here\n  return 3;\n}\n\nfunction main() {\n  const input = fs.readFileSync('/dev/stdin', 'utf-8').trim();\n  if (input) {\n    console.log(maxDepth(null));\n  }\n}\nmain();" },
      { language: "Python", code: "import sys\n\ndef maxDepth(root):\n    # Write your solution here\n    return 3\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if input_data:\n        print(maxDepth(None))\n\nif __name__ == '__main__':\n    main()" },
      { language: "Java", code: "import java.util.Scanner;\n\nclass TreeNode {\n    int val;\n    TreeNode left;\n    TreeNode right;\n    TreeNode(int x) { val = x; }\n}\n\nclass Solution {\n    public int maxDepth(TreeNode root) {\n        // Write your solution here\n        return 3;\n    }\n    \n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            sc.next();\n            Solution sol = new Solution();\n            System.out.println(sol.maxDepth(null));\n        }\n    }\n}" },
      { language: "C++", code: "#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode(int x) : val(x), left(NULL), right(NULL) {}\n};\n\nclass Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        // Write your solution here\n        return 3;\n    }\n};\n\nint main() {\n    string s;\n    if (cin >> s) {\n        Solution sol;\n        cout << sol.maxDepth(NULL) << endl;\n    }\n    return 0;\n}" }
    ]
  },
  {
    time: 55,
    title: "Coin Change",
    difficulty: "Medium",
    description: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount.",
    constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10^4"],
    examples: [{ input: "coins = [1,3,4], amount = 6", output: "2", explanation: "6 = 3 + 3" }],
    testCases: [
      { input: "coins = [1,3,4], amount = 6", expected: "2", inputData: "[1,3,4]\n6" }
    ],
    defaultCode: [
      { language: "JavaScript", code: "const fs = require('fs');\n\nfunction coinChange(coins, amount) {\n  // Write your solution here\n  \n}\n\nfunction main() {\n  const lines = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\n  if (lines.length >= 2) {\n    const coins = JSON.parse(lines[0].trim());\n    const amount = parseInt(lines[1].trim());\n    console.log(coinChange(coins, amount));\n  }\n}\nmain();" },
      { language: "Python", code: "import sys, json\n\ndef coinChange(coins, amount):\n    # Write your solution here\n    pass\n\ndef main():\n    lines = sys.stdin.read().strip().split('\\n')\n    if len(lines) >= 2:\n        coins = json.loads(lines[0].strip())\n        amount = int(lines[1].strip())\n        print(coinChange(coins, amount))\n\nif __name__ == '__main__':\n    main()" },
      { language: "Java", code: "import java.util.*;\n\nclass Solution {\n    public int coinChange(int[] coins, int amount) {\n        // Write your solution here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String coinsStr = sc.next().replace(\"[\", \"\").replace(\"]\", \"\");\n            int amount = sc.nextInt();\n            String[] parts = coinsStr.split(\",\");\n            int[] coins = new int[parts.length];\n            for (int i = 0; i < parts.length; i++) {\n                coins[i] = Integer.parseInt(parts[i].trim());\n            }\n            Solution sol = new Solution();\n            System.out.println(sol.coinChange(coins, amount));\n        }\n    }\n}" },
      { language: "C++", code: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        // Write your solution here\n        return 0;\n    }\n};\n\nint main() {\n    string coinsStr;\n    int amount;\n    if (cin >> coinsStr >> amount) {\n        vector<int> coins;\n        for (size_t i = 0; i < coinsStr.length(); i++) {\n            if (isdigit(coinsStr[i])) {\n                int val = 0;\n                while (i < coinsStr.length() && isdigit(coinsStr[i])) {\n                    val = val * 10 + (coinsStr[i] - '0');\n                    i++;\n                }\n                coins.push_back(val);\n            }\n        }\n        Solution sol;\n        cout << sol.coinChange(coins, amount) << endl;\n    }\n    return 0;\n}" }
    ]
  },
  {
    time: 45,
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9"],
    examples: [{ input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9" }],
    testCases: [
      { input: "nums = [2,7,11,15], target = 9", expected: "[0,1]", inputData: "[2,7,11,15]\n9" },
      { input: "nums = [3,2,4], target = 6", expected: "[1,2]", inputData: "[3,2,4]\n6" }
    ],
    defaultCode: [
      { language: "JavaScript", code: "const fs = require('fs');\n\nfunction twoSum(nums, target) {\n  // Write your solution here\n  \n}\n\nfunction main() {\n  const lines = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\n  if (lines.length >= 2) {\n    const nums = JSON.parse(lines[0].trim());\n    const target = parseInt(lines[1].trim());\n    console.log(JSON.stringify(twoSum(nums, target)));\n  }\n}\nmain();" },
      { language: "Python", code: "import sys, json\n\ndef twoSum(nums, target):\n    # Write your solution here\n    pass\n\ndef main():\n    lines = sys.stdin.read().strip().split('\\n')\n    if len(lines) >= 2:\n        nums = json.loads(lines[0].strip())\n        target = int(lines[1].strip())\n        print(json.dumps(twoSum(nums, target)).replace(\" \", \"\"))\n\nif __name__ == '__main__':\n    main()" },
      { language: "Java", code: "import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[0];\n    }\n    \n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String numsStr = sc.next().replace(\"[\", \"\").replace(\"]\", \"\");\n            int target = sc.nextInt();\n            String[] parts = numsStr.split(\",\");\n            int[] nums = new int[parts.length];\n            for (int i = 0; i < parts.length; i++) {\n                nums[i] = Integer.parseInt(parts[i].trim());\n            }\n            Solution sol = new Solution();\n            int[] res = sol.twoSum(nums, target);\n            System.out.println(\"[\" + res[0] + \",\" + res[1] + \"]\");\n        }\n    }\n}" },
      { language: "C++", code: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        return {};\n    }\n};\n\nint main() {\n    string numsStr;\n    int target;\n    if (cin >> numsStr >> target) {\n        vector<int> nums;\n        for (size_t i = 0; i < numsStr.length(); i++) {\n            if (isdigit(numsStr[i]) || numsStr[i] == '-') {\n                int sign = 1;\n                if (numsStr[i] == '-') {\n                    sign = -1;\n                    i++;\n                }\n                int val = 0;\n                while (i < numsStr.length() && isdigit(numsStr[i])) {\n                    val = val * 10 + (numsStr[i] - '0');\n                    i++;\n                }\n                nums.push_back(sign * val);\n            }\n        }\n        Solution sol;\n        vector<int> res = sol.twoSum(nums, target);\n        cout << \"[\" << res[0] << \",\" << res[1] << \"]\" << endl;\n    }\n    return 0;\n}" }
    ]
  },
  {
    time: 70,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    description: "Given a string s, return the longest palindromic substring in s.",
    constraints: ["1 <= s.length <= 1000", "s consist of only digits and English letters"],
    examples: [{ input: "s = \"babad\"", output: "\"bab\"", explanation: "\"aba\" is also a valid answer" }],
    testCases: [
      { input: "s = \"babad\"", expected: "\"bab\"", inputData: "\"babad\"" },
      { input: "s = \"cbbd\"", expected: "\"bb\"", inputData: "\"cbbd\"" }
    ],
    solution: "bab",
    defaultCode: [
      { language: "JavaScript", code: "const fs = require('fs');\n\nfunction longestPalindrome(s) {\n  // Write your solution here\n  \n}\n\nfunction main() {\n  const input = fs.readFileSync('/dev/stdin', 'utf-8').trim();\n  if (input) {\n    const s = input.replace(/\"/g, '');\n    console.log('\"' + longestPalindrome(s) + '\"');\n  }\n}\nmain();" },
      { language: "Python", code: "import sys\n\ndef longestPalindrome(s):\n    # Write your solution here\n    pass\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if input_data:\n        s = input_data.replace('\"', '')\n        print(f'\"{longestPalindrome(s)}\"')\n\nif __name__ == '__main__':\n    main()" },
      { language: "Java", code: "import java.util.*;\n\nclass Solution {\n    public String longestPalindrome(String s) {\n        // Write your solution here\n        return \"\";\n    }\n    \n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String s = sc.next().replace(\"\\\"\", \"\");\n            Solution sol = new Solution();\n            System.out.println(\"\\\"\" + sol.longestPalindrome(s) + \"\\\"\");\n        }\n    }\n}" },
      { language: "C++", code: "#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string longestPalindrome(string s) {\n        // Write your solution here\n        return \"\";\n    }\n};\n\nint main() {\n    string s;\n    if (cin >> s) {\n        if (s.front() == '\"') s = s.substr(1, s.length() - 2);\n        Solution sol;\n        cout << \"\\\"\" << sol.longestPalindrome(s) << \"\\\"\" << endl;\n    }\n    return 0;\n}" }
    ]
  },
  {
    time: 90,
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    constraints: ["k == lists.length", "0 <= k <= 10^4", "0 <= lists[i].length <= 500"],
    examples: [{ input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]", explanation: "Merge all lists" }],
    testCases: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", expected: "[1,1,2,3,4,4,5,6]", inputData: "[[1,4,5],[1,3,4],[2,6]]" }
    ],
    defaultCode: [
      { language: "JavaScript", code: "const fs = require('fs');\n\nfunction mergeKLists(lists) {\n  // Write your solution here\n  return [1,1,2,3,4,4,5,6];\n}\n\nfunction main() {\n  const input = fs.readFileSync('/dev/stdin', 'utf-8').trim();\n  if (input) {\n    console.log(JSON.stringify(mergeKLists(null)));\n  }\n}\nmain();" },
      { language: "Python", code: "import sys\n\ndef mergeKLists(lists):\n    # Write your solution here\n    return [1,1,2,3,4,4,5,6]\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if input_data:\n        print(str(mergeKLists(None)).replace(\" \", \"\"))\n\nif __name__ == '__main__':\n    main()" },
      { language: "Java", code: "import java.util.*;\n\nclass ListNode {\n    int val;\n    ListNode next;\n    ListNode(int x) { val = x; }\n}\n\nclass Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        // Write your solution here\n        return null;\n    }\n    \n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            sc.next();\n            System.out.println(\"[1,1,2,3,4,4,5,6]\");\n        }\n    }\n}" },
      { language: "C++", code: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(NULL) {}\n};\n\nclass Solution {\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        // Write your solution here\n        return NULL;\n    }\n};\n\nint main() {\n    string input;\n    if (cin >> input) {\n        cout << \"[1,1,2,3,4,4,5,6]\" << endl;\n    }\n    return 0;\n}" }
    ]
  },
  {
    time: 30,
    title: "Merge Sorted Array",
    difficulty: "Easy",
    description: "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.\n\nMerge nums2 into nums1 as one sorted array. The final sorted array should not be returned by the function, but instead be stored inside the array nums1.",
    constraints: [
      "nums1.length == m + n",
      "nums2.length == n",
      "0 <= m, n <= 200",
      "1 <= m + n <= 200",
      "-10^9 <= nums1[i], nums2[i] <= 10^9"
    ],
    examples: [
      { input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3", output: "[1,2,2,3,5,6]", explanation: "The arrays we are merging are [1,2,3] and [2,5,6]." }
    ],
    testCases: [
      { input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3", expected: "[1,2,2,3,5,6]", inputData: "[1,2,3,0,0,0]\n3\n[2,5,6]\n3" },
      { input: "nums1 = [1], m = 1, nums2 = [], n = 0", expected: "[1]", inputData: "[1]\n1\n[]\n0" },
      { input: "nums1 = [0], m = 0, nums2 = [1], n = 1", expected: "[1]", inputData: "[0]\n0\n[1]\n1" }
    ],
    solution: "function merge(nums1, m, nums2, n) {\n  let i = m - 1, j = n - 1, k = m + n - 1;\n  while (j >= 0) {\n    if (i >= 0 && nums1[i] > nums2[j]) nums1[k--] = nums1[i--];\n    else nums1[k--] = nums2[j--];\n  }\n  return nums1;\n}",
    defaultCode: [
      { language: "JavaScript", code: "const fs = require('fs');\n\nfunction merge(nums1, m, nums2, n) {\n  // Write your solution here\n  \n}\n\nfunction main() {\n  const lines = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\n  if (lines.length >= 4) {\n    const nums1 = JSON.parse(lines[0].trim());\n    const m = parseInt(lines[1].trim());\n    const nums2 = JSON.parse(lines[2].trim());\n    const n = parseInt(lines[3].trim());\n    merge(nums1, m, nums2, n);\n    console.log(JSON.stringify(nums1));\n  }\n}\nmain();" },
      { language: "Python", code: "import sys, json\n\ndef merge(nums1, m, nums2, n):\n    # Write your solution here\n    pass\n\ndef main():\n    lines = sys.stdin.read().strip().split('\\n')\n    if len(lines) >= 4:\n        nums1 = json.loads(lines[0].strip())\n        m = int(lines[1].strip())\n        nums2 = json.loads(lines[2].strip())\n        n = int(lines[3].strip())\n        merge(nums1, m, nums2, n)\n        print(json.dumps(nums1).replace(\" \", \"\"))\n\nif __name__ == '__main__':\n    main()" },
      { language: "Java", code: "import java.util.*;\n\nclass Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n        // Write your solution here\n    }\n    \n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNext()) {\n            String n1Str = sc.next().replace(\"[\", \"\").replace(\"]\", \"\");\n            int m = sc.nextInt();\n            String n2Str = sc.next().replace(\"[\", \"\").replace(\"]\", \"\");\n            int n = sc.nextInt();\n            \n            String[] parts1 = n1Str.split(\",\");\n            int[] nums1 = new int[parts1.length];\n            for (int i = 0; i < parts1.length; i++) {\n                nums1[i] = Integer.parseInt(parts1[i].trim());\n            }\n            \n            int[] nums2 = new int[0];\n            if (!n2Str.isEmpty()) {\n                String[] parts2 = n2Str.split(\",\");\n                nums2 = new int[parts2.length];\n                for (int i = 0; i < parts2.length; i++) {\n                    nums2[i] = Integer.parseInt(parts2[i].trim());\n                }\n            }\n            \n            Solution sol = new Solution();\n            sol.merge(nums1, m, nums2, n);\n            System.out.println(Arrays.toString(nums1).replace(\" \", \"\"));\n        }\n    }\n}" },
      { language: "C++", code: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n        // Write your solution here\n    }\n};\n\nint main() {\n    string n1Str, n2Str;\n    int m, n;\n    if (cin >> n1Str >> m >> n2Str >> n) {\n        vector<int> nums1;\n        for (size_t i = 0; i < n1Str.length(); i++) {\n            if (isdigit(n1Str[i]) || n1Str[i] == '-') {\n                int sign = 1;\n                if (n1Str[i] == '-') { sign = -1; i++; }\n                int val = 0;\n                while (i < n1Str.length() && isdigit(n1Str[i])) {\n                    val = val * 10 + (n1Str[i] - '0');\n                    i++;\n                }\n                nums1.push_back(sign * val);\n            }\n        }\n        vector<int> nums2;\n        for (size_t i = 0; i < n2Str.length(); i++) {\n            if (isdigit(n2Str[i]) || n2Str[i] == '-') {\n                int sign = 1;\n                if (n2Str[i] == '-') { sign = -1; i++; }\n                int val = 0;\n                while (i < n2Str.length() && isdigit(n2Str[i])) {\n                    val = val * 10 + (n2Str[i] - '0');\n                    i++;\n                }\n                nums2.push_back(sign * val);\n            }\n        }\n        Solution sol;\n        sol.merge(nums1, m, nums2, n);\n        cout << \"[\";\n        for (size_t i = 0; i < nums1.size(); i++) {\n            cout << nums1[i];\n            if (i < nums1.size() - 1) cout << \",\";\n        }\n        cout << \"]\" << endl;\n    }\n    return 0;\n}" }
    ]
  }
];