import React from "react";
import { connect } from "react-redux";
import { Todo, fetchTodos, deleteTodo } from "../actions";

import { StoreState } from "../reducers";

interface AppProps {
	todos: Todo[];
	fetchTodos: Function;
	deleteTodo: typeof deleteTodo;
}

interface AppState {
	fetching: boolean;
}

class _App extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			fetching: false
		};
	}

	componentDidUpdate(preProps: AppProps): void {
		if (!preProps.todos.length && this.props.todos.length) {
			this.setState({
				fetching: false
			});
		}
	}

	onButtonClick = () => {
		this.setState({ fetching: true });
		this.props.fetchTodos();
	};

	onTodoClick = (id: number): void => {
		this.props.deleteTodo(id);
	};

	renderList = (): JSX.Element[] => {
		return this.props.todos.map((todo: Todo) => {
			return (
				<div key={todo.id} onClick={() => this.onTodoClick(todo.id)}>
					{todo.title}
				</div>
			);
		});
	};

	render() {
		return (
			<div>
				<button onClick={this.onButtonClick}>Fetch</button>
				{this.state.fetching ? <div>fetching</div> : this.renderList()}
			</div>
		);
	}
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
	return { todos };
};

export const App = connect(
	mapStateToProps,
	{ fetchTodos, deleteTodo }
)(_App);

// 1. 组件必须获得actionCreator来生成 fetchtodos action。
// 2. mapStateToProps 函数将数据从redux store中取出来，并且将他们作为props传递给组件。
