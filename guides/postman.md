#POSTMAN GUIDE


**This script is used to set a global variable that can be reused on a environment**
```
if (pm.response.code === 200) {
    pm.environment.set('authToken', pm.response.json().token)
}
``` 

---

