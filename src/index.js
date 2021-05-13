// Import SCSS entry file so that webpack picks up changes
import './index.scss';
import { addFilter } from '@wordpress/hooks';
import { useState } from '@wordpress/element';
import { Button } from '@wordpress/components';



const PLUGIN_PREFIX = 'woocommerce-admin-tasklist-tester';

let completedTasks = [];
function getCompletedTasks() {
  const completedTaskData = localStorage.getItem(PLUGIN_PREFIX);
  completedTasks = completedTaskData ? JSON.parse(completedTaskData) : [];
}
getCompletedTasks();

function Comp({ task }) {
	const [completed, setCompleted] = useState((completedTasks || []).includes(task.key));
	const onComplete = (completed) => {
		if (!completed) {
			localStorage.setItem(PLUGIN_PREFIX, JSON.stringify([...(completedTasks || []), task.key]));
			getCompletedTasks();
			setCompleted((completedTasks || []).includes(task.key));
		}
	}
	return (
		<div>
			<h3>This is a sample screen of a task container</h3>
			<h4>Task name: {task.title}</h4>
			{ completed ? <div>Task is completed</div> : <Button isPrimary onClick={() => onComplete()}>Complete task</Button>}
			<p><small>You can clear the completed tasks by removing the {PLUGIN_PREFIX} in localStorage.</small></p>
		</div>
	);
}

const tasklistTesterTasks = [{
	key: PLUGIN_PREFIX + '-setup',
	title: 'Set up the task list tester',
	visible: true,
	time: '1 minute',
	level: 2,
	isDismissable: true,
	allowRemindMeLater: true
},
{
	key: PLUGIN_PREFIX + '-sample',
	title: 'A level 1 example',
	visible: true,
	level: 1,
	time: '5 minutes',
	isDismissable: true,
},
{
	key: PLUGIN_PREFIX + '-standard-list-item',
	title: 'A standard task',
	visible: true,
	time: '2 minutes',
	isDismissable: false,
	allowRemindMeLater: false
}];

function getTasks() {
	return tasklistTesterTasks.map((task) => {
		return {
			...task,
			completed: (completedTasks || []).includes(task.key),
			additionalInfo: 'A sample task list item.',
			container: <Comp task={task} />
		};
	});
}

addFilter(
	'woocommerce_admin_onboarding_task_list',
	PLUGIN_PREFIX,
	(tasks) => {
		return [
			...tasks,
			...getTasks()
		];
	}
);