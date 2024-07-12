class GeneratorService {
  generateImage = async (prompt: string) => {
    if (prompt == "") throw "Prompt must be provided";

    try {
      const res = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      return await res.json();
    } catch (err: any) {
      console.info("Error from Generator Service:", err.error.message);
      throw err;
    }
  };
}

const service = new GeneratorService();

export default service;
