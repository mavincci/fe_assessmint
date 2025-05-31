import React from 'react';
import { CalendarIcon, ChartBar, Clock, Clock10Icon, List } from 'lucide-react';
import StatCard from '../components/StatCard';
import UpcomingAssignment from '../components/UpcomingAssessment';
import ActivityItem from '../components/ActivityItem';
import BarChartCard from '../components/BarChartCard';
import AreaChartCard from '../components/AreaChartCard';
import SubscribersCard from '../components/SubscribersCard';
import CircularProgressCard from '../components/CircularProgressCard';
import WelcomeCard from '../components/WelcomeCard';
import StateCard from '../components/StateCard';
import { Calendar, Folder, User, Users } from '../components/Icons';
import { color, motion } from 'framer-motion'
import { fetchAllUsers } from '../action/Auth';
import useSWR from 'swr';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
}
const ExaminerDashboard = () => {
    const ONE_DAY = 1000 * 60 * 60 * 24; 
  //  const { cache } = useSWRConfig();
const { data: users, error, isLoading } = useSWR("all_users_list", fetchAllUsers, {
  dedupingInterval: ONE_DAY,
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  errorRetryCount:2
});
  
  console.log("usrs", users)
  // Mock data for the dashboard

  const stats = [
    {
      title: "Total Assessment",
      value: 567,
      icon: (
        <svg width="44" height="36" viewBox="0 0 44 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 34C2 34 4.87074 -4.48536 12.0571 13.3418C19.2435 31.1689 22.1143 30.3501 24.8571 16.5823C28.2477 -0.436459 40.7465 14.2172 42 2" stroke="black" strokeWidth="3"  strokeLinecap="round"/>
<path d="M2 34C2 34 4.87074 -4.48536 12.0571 13.3418C19.2435 31.1689 22.1143 30.3501 24.8571 16.5823C28.2477 -0.436459 40.7465 14.2172 42 2" stroke="black" strokeOpacity="0.21" strokeWidth="3"  strokeLinecap="round"/>
<path d="M2 34C2 34 4.87074 -4.48536 12.0571 13.3418C19.2435 31.1689 22.1143 30.3501 24.8571 16.5823C28.2477 -0.436459 40.7465 14.2172 42 2" stroke="black" strokeWidth="3"  strokeLinecap="round"/>
</svg>

      ),
      visible: ["EXAMINER"],
      bg:"bg-[#746EF1B5]"
      
    },
    {
      title: "Pending Evaluation",
      value: 8,
      subtitle: "assignments for evaluation",
      icon: <CalendarIcon className="h-8 w-8" />,
      visible : ["EXAMINER"]

    },
    {
      title: "Scheduled Assignment",
      value: 2,
      subtitle: "Next 7 days",
      icon: <Clock className="h-8 w-8" />,
      visible : ["EXAMINER"]

    },
      {
      title: "Taken Assessment",
      value: 5,
      subtitle: "",
        icon: <Clock10Icon className="h-8 w-8" />,
        visible: ["EXAMINEE"],
        color:"warning",
      bg:"bg-[#746EF1]"

            

    },  {
      title: "Pending Assessment ",
      value: 5,
      subtitle: "Next 7 days",
        icon: <Clock className="h-8 w-8" />,
            visible : ["EXAMINEE"]

    },
  ];

  const upcomingAssignments = [
    { title: 'Front End Interview', date: 'may 5,2025', time: '10:00AM-12:00PM', candidates: 2 },
    { title: 'Front End Interview', date: 'may 5,2025', time: '10:00AM-12:00PM', candidates: 2 },
    { title: 'Front End Interview', date: 'may 5,2025', time: '10:00AM-12:00PM', candidates: 2 }
  ];

  const activities = [
    { 
      type: 'created assignment',
      description: 'created assessment',
      details: 'Frontend Developer Skills',
      time: '2 minutes ago' 
    },
    { 
      type: 'evaluation',
      description: 'evaluation new assessment',
      details: 'Python Programming Basics',
      time: '45 minutes ago' 
    },
    { 
      type: 'invitation',
      description: 'invited 3 candidates',
      details: 'Data Science Interview',
      time: '2 hours ago' 
    },
    { 
      type: 'update',
      description: 'modified assessment',
      details: 'UX Design Challenge',
      time: '3 hours ago' 
    },
    { 
      type: 'Add question',
      description: 'added new question bank',
      details: 'JavaScript Algorithms',
      time: '5 hours ago' 
    },
  ];
  const user = JSON.parse(localStorage.getItem("user"))
  const isExaminer = user.roles.some(role => role === "EXAMINER");
  const isAdmin = user.roles.some(role => role === "ADMIN");
  const currentuser= user.roles.filter(role => role !== "USER")[0]
  return (
    <div className="min-h-screen bg-bg-light dark:bg-gray-800 dark:text-bg-light">
      <div className="container mx-auto px-4 py-6">
        {/* <Header userName="Examiner user" /> */}

        {/* Stats Cards */}
        <motion.div  variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" >
          {stats.map((stat, index) => {
            if (stat.visible.includes(currentuser)) {
              return (
                 <StateCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
                  subtitle={stat.subtitle}
                  color={stat.color}
                  bg={stat.bg}
                />
                
                
              )
            }
          })}
        </motion.div >

        {/* Main Content */}
        {
          isExaminer  ? <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upcoming Assignments */}
          <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-700 dark:text-bg-light ">
            <h2 className="text-lg font-semibold mb-1">Upcoming assignments</h2>
            <p className="text-sm text-gray-500 mb-4">scheduled assignments for the next 7 days</p>
            <div className="divide-y divide-gray-100 space-y-3 p-2">
              {upcomingAssignments.map((assignment, index) => (
                <UpcomingAssignment
                  key={index}
                  title={assignment.title}
                  date={assignment.date}
                  time={assignment.time}
                  candidates={assignment.candidates}
                />
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-700 dark:text-bg-light">
            <h2 className="text-lg font-semibold mb-1">Recent Submission</h2>
            <p className="text-sm text-gray-500 mb-4">4 assignment waiting for review and evaluation</p>
            <div>
              {activities.map((activity, index) => (
                <ActivityItem
                  key={index}
                  type={activity.type}
                  description={activity.description}
                  details={activity.details}
                  time={activity.time}
                />
              ))}
            </div>
          </div>
          </div> :""
              
        }
{/* ADmin  Dashboard */}
        {isAdmin && <>
          
      <div className="container px-4 mx-auto bg-bg-light dark:bg-gray-800 dark:text-bg-light">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.div variants={fadeInUp}>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back, Admin. Here's what's happening.</p>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[{
            title: "Total User", value: users?.body?.length, Icon: Users, color: "primary"
          }, {
            title: "Total Examiner", value: users?.body?.filter((user)=>user.roles.includes("EXAMINER")).length, Icon: User, color: "secondary"
          }, {
            title: "Repository", value: "35", Icon: Folder, color: "success"
          }, {
            title: "Assignment created", value: "35", Icon: List, color: "info"
          }].map((card, index) => (
            <motion.div key={card.title} variants={fadeInUp} custom={index + 1}>
              <StateCard
                title={card.title}
                value={card.value}
                Icon={card.Icon}
                color={card.color}
                delay={(index + 1) * 40}
              />
            </motion.div>
          ))}
        </div>

        {/* Middle Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-8 w-full">
          <motion.div variants={fadeInUp} custom={1} className="w-full md:w-[40%]">
            <WelcomeCard />
          </motion.div>

          <motion.div
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            initial="hidden"
            animate="visible"
            className="w-full md:w-[60%] flex flex-col lg:flex-row justify-between gap-4"
          >
            <motion.div variants={fadeInUp} className="lg:w-1/2 w-full">
              <SubscribersCard
                count="23.62K Birr"
                title="Today's Subscription Earning"
                type="money"
                from="from-transparent"
                to="to-teal-500"
              />
            </motion.div>
            <motion.div variants={fadeInUp} className="lg:w-1/2 w-full">
              <SubscribersCard
                count= {users?.body?.length}
                title="Subscribers"
                from="from-[#2C3E50]"
                to="to-[#4CA1AF]"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          <motion.div variants={fadeInUp} className="lg:col-span-2 ">
            <AreaChartCard title="Created Assessment" subtitle="(+5) more in 2024" />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <BarChartCard title="Active Users" subtitle="(+23) than last week" noOfusers= {users?.body?.length} />
          </motion.div>
        </div>
      </motion.div>
    </div>
        </>}
        
      </div>
    </div>
  );
};

export default ExaminerDashboard;