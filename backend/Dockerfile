FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvn
RUN ./mvn clean package -DskipTests

EXPOSE 8080

CMD ["sh", "-c", "java -Dserver.port=$PORT -jar target/*.jar"]
