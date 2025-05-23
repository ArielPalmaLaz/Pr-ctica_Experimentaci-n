from flask import Flask, render_template, request 

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/process", methods=["POST"])
def process():
    nombre = request.form.get("nombre")
    email = request.form.get("email")
    option = request.form.get("option")
    referente = request.form.get("referente")
    descripción = request.form.get("mensaje")

    return f"Hola, {nombre} con el email {email}" 

if __name__ == '__main__':
    app.run(debug=True)
