---
sidebar_position: 20
---


# Get Help

Get help on joining the Dingtalk(钉钉) Group by [clicking this link.]( https://h5.dingtalk.com/circle/healthCheckin.html?dtaction=os&corpId=ding66e5c6edd2286ee0daaacaebab5406a2&b2324693-=bf33ff07-&cbdbhh=qwertyuiop)
or using below QR code:

![dingtalk](/img/contributing/dingtalk.jpg)


## Commands

### Get KubeDL Controller Pod Logs

```bash
kubectl logs kubedl-controller-manager-0 -n kubedl-system
```

### Get KubeDL Controller Pod status

```bash
kubectl describe pod kubedl-controller-manager-0 -n kubedl-system
```
