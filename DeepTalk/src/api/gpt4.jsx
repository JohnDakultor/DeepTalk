import axios from 'axios'


  const gpt4 = async (message)=> {
    const options = {
        method: 'POST',
        url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2',
        headers: {
          'x-rapidapi-key': "7153825a62mshafa1a2b4db4d50ap1fd2d6jsnc2b1bb6d3748",
          'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          messages: [
            {
              role: 'user',
              content: message
            }
          ],
          system_prompt: '',
          temperature: 0.9,
          top_k: 5,
          top_p: 0.9,
          max_tokens: 256,
          web_access: false
        }
      };


      try {
        const response = await axios.request(options);
        return response.data.result; // Return only the result property
      } catch (error) {
        console.error('Error fetching from GPT-4 API:', error);
        return 'Sorry, something went wrong.';
      }
}

export default (gpt4);