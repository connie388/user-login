const genMessage = (name, intro, instructions, text, outro, link) => {
  const msg = {
    body: {
      name: name,
      intro: intro,
      action: {
        instructions: instructions,
        button: {
          color: "#33b5e5",
          text: text,
          link: link,
        },
      },
      outro: outro,
    },
  };

  return msg;
};

module.exports = genMessage;
