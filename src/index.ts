


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
				   * this is the "R" ( retriveal) part of the RAG
				   * insert the vector and material into this.env.COURSE_NOTES_INDEX
				   */
				  @callable() 
				  async addCourseMaterial(material: string) {

					console.log(`Adding material: ${material.substring(0, 20)}...`);
					    return { success: true };
				  }

				  /**
				   * Asks a question to the agent.
				   * This is the "A" (Augmented) and "G" (Generation) part of RAG.
				   */
				  @callable()
				  async askQuestion(query: string): Promise<string> {
					// TODO:
					// 1. Get relevant context from this.env.COURSE_NOTES_INDEX based on the 'query'
					// 2. Use this.env.AI to generate an answer using the retrieved context
					
					console.log(`Answering question: ${query}`);
					return "This is a placeholder answer.";
				  }
         }