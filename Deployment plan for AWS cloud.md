# מערכת מבוססת ענן AWS - תיאור ארכיטקטורה ופריסה

## מבוא
פרויקט זה כולל מערכת עם שני רכיבי Backend ו-Frontend, המופצת בענן AWS ומנוהלת בתהליכי DevOps מתקדמים.  
המערכת כוללת שני APIs: API ראשון מבוסס .NET 8 עם SQL Server, ו-API שני מבוסס Node.js עם MongoDB Atlas.  
הנתונים נשמרים ב-SQL Server ו-MongoDB Atlas בהתאם לרכיב.

---

## 1. ארכיטקטורת המערכת בענן

### Frontend
- אפליקציית React עם Redux Toolkit.
- מאוחסנת ב-AWS S3 כאתר סטטי.
- מופצת גלובלית ומהירה באמצעות AWS CloudFront (CDN).

### Backend - מסך ראשון (.NET 8 + SQL Server)
- ה-API רץ ב-AWS Elastic Beanstalk לניהול ופריסה פשוטה של אפליקציות .NET.
- בסיס הנתונים מנוהל באמצעות Amazon RDS עם SQL Server, כולל גיבויים ואבטחה.

### Backend - מסך שני (Node.js + MongoDB Atlas)
- ה-API מבוסס Node.js מופעל גם ב-AWS Elastic Beanstalk לניהול וסקיילינג.
- בסיס הנתונים הוא MongoDB Atlas, שירות ענן מבוסס MongoDB, עם חיבור מאובטח מהשרת.

---

## 2. תהליכי DevOps ואוטומציה
- שימוש ב-AWS CodePipeline ו-AWS CodeBuild לבניית תהליך CI/CD אוטומטי.
- תהליך הבנייה, הבדיקה והפריסה מתבצע אוטומטית בכל Push ל-branch הראשי ב-GIT.
- מאפשר שחרור מהיר, אמין ומאובטח של המערכת בענן.

---

## 3. ניטור ואבטחה
- AWS CloudWatch משמש לניטור בזמן אמת של לוגים, ביצועים וזמינות השירותים.
- AWS IAM לניהול הרשאות מבוססות תפקידים לשירותי הענן השונים.
- גישת ה-API ל-MongoDB Atlas מתבצעת דרך חיבור מוצפן וניהול גישה מבוקר.

---

## 4. ניהול תצורה
- ניהול תצורה באמצעות AWS Systems Manager.
- שימוש ב-Infrastructure as Code (IaC) עם AWS CloudFormation ליצירת סביבה אחידה, יציבה וניתנת לשחזור.

---

## 5. שרטוט הארכיטקטורה
See: [docs/AWS_Cloud_Architecture_Diagram.pdf](docs/AWS_Cloud_Architecture_Diagram.pdf)

- React App ב-S3 ו-CloudFront.
- שני רכיבי Backend ב-Elastic Beanstalk.
- Amazon RDS עם SQL Server.
- MongoDB Atlas.
- תהליכי CI/CD עם CodePipeline ו-CodeBuild.
- ניטור עם CloudWatch.
- ניהול הרשאות עם IAM.

---

## הערות נוספות
מסמך זה מסכם את הארכיטקטורה, פריסת המערכת, תהליכי DevOps, ניטור, אבטחה וניהול תצורה בענן AWS עבור הפרויקט.

---

