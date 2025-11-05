// import { DurableObject } from "cloudflare:workers";

// /**
//  * Welcome to Cloudflare Workers! This is your first Durable Objects application.
//  *
//  * - Run `npm run dev` in your terminal to start a development server
//  * - Open a browser tab at http://localhost:8787/ to see your Durable Object in action
//  * - Run `npm run deploy` to publish your application
//  *
//  * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
//  * `Env` object can be regenerated with `npm run cf-typegen`.
//  *
//  * Learn more at https://developers.cloudflare.com/durable-objects
//  */

// /** A Durable Object's behavior is defined in an exported Javascript class */
// export class MyDurableObject extends DurableObject<Env> {
// 	/**
// 	 * The constructor is invoked once upon creation of the Durable Object, i.e. the first call to
// 	 * 	`DurableObjectStub::get` for a given identifier (no-op constructors can be omitted)
// 	 *
// 	 * @param ctx - The interface for interacting with Durable Object state
// 	 * @param env - The interface to reference bindings declared in wrangler.jsonc
// 	 */
// 	constructor(ctx: DurableObjectState, env: Env) {
// 		super(ctx, env);
// 	}

// 	/**
// 	 * The Durable Object exposes an RPC method sayHello which will be invoked when when a Durable
// 	 *  Object instance receives a request from a Worker via the same method invocation on the stub
// 	 *
// 	 * @param name - The name provided to a Durable Object instance from a Worker
// 	 * @returns The greeting to be sent back to the Worker
// 	 */
// 	async sayHello(name: string): Promise<string> {
// 		return `Hello, ${name}!`;
// 	}
// }

// export default {
// 	/**
// 	 * This is the standard fetch handler for a Cloudflare Worker
// 	 *
// 	 * @param request - The request submitted to the Worker from the client
// 	 * @param env - The interface to reference bindings declared in wrangler.jsonc
// 	 * @param ctx - The execution context of the Worker
// 	 * @returns The response to be sent back to the client
// 	 */
// 	async fetch(request, env, ctx): Promise<Response> {
// 		// Create a stub to open a communication channel with the Durable Object
// 		// instance named "foo".
// 		//
// 		// Requests from all Workers to the Durable Object instance named "foo"
// 		// will go to a single remote Durable Object instance.
// 		const stub = env.MY_DURABLE_OBJECT.getByName("foo");

// 		// Call the `sayHello()` RPC method on the stub to invoke the method on
// 		// the remote Durable Object instance.
// 		const greeting = await stub.sayHello("world");

// 		return new Response(greeting);
// 	},
// } satisfies ExportedHandler<Env>;


// setting up a main class for your FastAPI application

    import {Agent, unstable_callable as callabale, callable, type  AgentNamespace } from 'agents';

	// this the data that will be saved in the durable object

	/**
	 *  Defining the structure of a single message in the chat history
	 */
	export type Message = {
		role: 'user' | 'assistant';
		content: string;
	};


	/**
	 *  shape of agent's persistent meory ( its state)
	 *  This will include the chat history and any other relevant information
	 *      whatgets saved in the Durable Object
	 */
	export type TutorState = {
		chatHistory: Message[];
	};
	

	/**
	 * Defining binding that we expect to be in wangrler.toml
	 */
	export interface Env {
		TUTORAGENT: AgentNamespace<TutorAgent>;
	
	    //binding for workers AI ( the LLM)
       AI: Ai;

	   //binding for the RAG knowledge base
	      COURSE_NOTES_INDEX:  VectorizeIndex;
	}


	          

	   // Defining the TutorAgent class that extends the Agent class
	   export class TutorAgent extends Agent<Env, TutorState> {
                 
        /**
		 * The constructor initializes the TutorAgent with its context and environment
		 * extends base Agent class and inherits
		 *  state management (this.state), scheduling (this.schedule), and more.
		 */
		          onStart(){
					this.setState({ chatHistory: []});
					   console.log(`TutorAgent ${this.name} started.`);
				  }

				  /**
				   * adding new course materials to the Vectorize knowledge base
				   * this is the "R" ( retriveal) part of the RAG architecture
				   */
				  @callable() 
				  async addCourseMaterial(material: string): Promise<void> {

					console.log(`Adding material: ${material.substring(0, 20)}...`);
					return { success: true };

				  }
	   }