const { MongoClient } = require('mongodb');

// MongoDB 연결 URL
const url = 'mongodb://localhost:27017'; // MongoDB 서버 주소
const dbName = 'mydatabase'; // 데이터베이스 이름

// MongoDB 클라이언트 생성
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
    try {
        // MongoDB 서버에 연결
        await client.connect();
        console.log("Connected to MongoDB");

        // 데이터베이스와 컬렉션 선택
        const db = client.db(dbName);
        const collection = db.collection('pins');

        // 예제 데이터 삽입
        const result = await collection.insertOne({
            title: "Sample Title",
            author: "Admin",
            menu: "Sample Menu",
            content: "This is a sample content.",
            address: "123 Sample Address",
            lat: 37.5665,
            lng: 126.978,
            url: "http://example.com/sample-restaurant",
            photos: ["sample-photo1.jpg", "sample-photo2.jpg"], // 여러 사진 추가
            date: new Date().toISOString(), // 현재 날짜
            likes: 0, // 좋아요 수 필드 추가
            views: 0, // 조회수 필드 추가
            comments: [ // 댓글 필드 예제 추가
                {
                    author: "Commenter1",
                    comment: "This is a sample comment.",
                    date: new Date().toISOString(),
                    photos: ["comment-photo1.jpg", "comment-photo2.jpg"]
                }
            ] 
        });

        console.log("Inserted document:", result.insertedId);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        // MongoDB 클라이언트 연결 종료
        await client.close();
    }
}

main();
